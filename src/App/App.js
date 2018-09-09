import qs from 'qs'
import SendEmail from 'SendEmail'
import Redirect from 'Redirect'
import Respond from 'Respond'
import Validate from 'Validate'

export default (event, _, callback) => {
  let body = qs.parse(event.body)

  let {valid, errors} = Validate(body)

  if (valid) {
    let config = {}
    if (event.stageVariables) { config.region = event.stageVariables.region }
    SendEmail(body, config).catch(error => {
      callback(null, Respond(500, error.message))
    })
    callback(null, Redirect(body.redirect))
  } else {
    callback(null, Respond(400, errors))
  }
}