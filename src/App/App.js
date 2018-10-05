import qs from 'qs'
import SendEmail from 'SendEmail'
import Redirect from 'Redirect'
import Respond from 'Respond'
import Validate from 'Validate'

export default (event, _, callback) => {
  let body = qs.parse(event.body)

  console.log(`INCOMING\n${JSON.stringify(body)}`)

  let {valid, errors} = Validate(body)

  if (valid) {
    SendEmail(body).then(data => {
      console.log("EMAIL sent to "+body.to+" ("+data.MessageId+")");
    }).catch(error => {
      callback(null, Respond(500, error.message))
    })
    callback(null, Redirect(body.redirect))
  } else {
    callback(null, Respond(400, errors))
  }
}