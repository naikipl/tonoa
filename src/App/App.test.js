import App from 'App'
import event from 'gatewayEventMock'
import SendEmail from 'SendEmail'

jest.mock('SendEmail')

describe('App', () => {
  it('receives event, context and callback args', () => {
    let exec = () => App(event, {}, () => {})
    expect(exec).not.toThrow()
  })

  it('sends an email using data from event', () => {
    App({event}, {}, () => {})
    expect(SendEmail).toHaveBeenCalledWith({
      bccAddresses: [],
      ccAddresses: [],
      toAddresses: [],
      replyToAddresses: [],
      fromAddress: "",
      fromName: "",
      bounceAddress: "",
      subject: "",
      html: "",
      txt: ""
    }, expect.anything())
  })

  it('responds with a redirect when data is valid', () => {
    let spy = jest.fn()
    App(event, {}, spy)
    expect(spy).toHaveBeenCalledWith(null, {
      headers: {"Access-Control-Allow-Origin": "*"},
      Location: "redirect/url",
      statusCode: 301
    })
  })

  it('responds with bad request when data is invalid', () => {
    let spy = jest.fn()
    App({}, {}, spy)
    expect(spy).toHaveBeenCalledWith(null, {
      headers: {"Access-Control-Allow-Origin": "*"},
      statusCode: 400
    })
  })

  it('prints an error when SES fails', () => {
    let spy = console.log = jest.fn()
    expect(spy).toHaveBeenCalledWith("RESPONSE", "500:ses failed")
  })
})