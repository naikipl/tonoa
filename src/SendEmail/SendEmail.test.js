import SendEmail from 'SendEmail'
import AWS from 'aws-sdk'

jest.mock('aws-sdk')

describe('SendEmail', () => {
  let sendEmail

  beforeEach(() => {
    sendEmail = jest.fn((email, callback) => callback(null, {}))
    AWS.SES.mockImplementationOnce(() => ({sendEmail}))
  })

  it('returns a rejected promise when SES fails', done => {
    sendEmail = jest.fn((email, callback) => callback({message: "ses fail"}))
    SendEmail({}).catch(error => {
      expect(error.message).toEqual('ses fail')
      done()
    })
  })

  it('returns a resolved promise when SES finishs', done => {
    sendEmail = jest.fn((email, callback) => callback(null, {MessageId: "123"}))
    SendEmail({}).then(data => {
      expect(data.MessageId).toEqual('123')
      done()
    })
  })

  it('uses from as ReplyToAddresses and ReturnPath when they are not in body', done => {
    SendEmail({from: 't@e.com'}, {region: 'us-west-2'}).then(() => {
      expect(sendEmail).toHaveBeenCalledWith({
        Source: 't@e.com',
        Destination: {
          BccAddresses: [],
          CcAddresses: [],
          ToAddresses: undefined
        },
        Message: {
          Subject: { Data: undefined },
          Body: {
            Html: { Charset: "UTF-8", Data: undefined },
            Text: { Charset: "UTF-8", Data: undefined }
          }
        },
        ReplyToAddresses: ['t@e.com'],
        ReturnPath: 't@e.com'
      }, expect.anything())
      done()
    })
  })

  it('receives a config arg that is passed to SES', done =>  {
    SendEmail({}, {region: 'us-west-2'}).then(() => {
      expect(AWS.SES).toHaveBeenCalledWith({region: 'us-west-2'})
      done()
    })
  })
})