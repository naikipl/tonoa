import QueryString from 'qs'
import SendEmail from 'SendEmail'

export default (event, _, callback) => {
  // App.params = QueryString.parse(event.body);
  // App.respond = callback;
  // App.host = event.stageVariables.host;
  // App.info_email = event.stageVariables.info_email;

  let data = event
  SendEmail(data, callback)
}