import AWS from 'aws-sdk'

export default (body) => {
  let email = {
    Source: body.from,
    Destination: {
      BccAddresses: body.bcc || [],
      CcAddresses: body.cc || [],
      ToAddresses: body.to
    },
    Message: {
      Subject: { Data: body.subject },
      Body: {
        Html: { Charset: "UTF-8", Data: body.html },
        Text: { Charset: "UTF-8", Data: body.text }
      }
    },
    ReplyToAddresses: body.reply || [body.from],
    ReturnPath: body.bounce || body.from
  }

  return new Promise((resolve, reject) => {
    let ses = new AWS.SES({region: "us-west-2"})
    ses.sendEmail(email, (error, data) => {
      (error) ? reject(error) : resolve(data)
    })
  })
}