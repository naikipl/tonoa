export default () => {}

//
// function send_mail(subject, template, context, to, from, callback){
//   let html = FS.readFileSync(__dirname + '/app/'+template+'.html', 'utf8');
//   let txt = FS.readFileSync(__dirname + '/app/'+template+'.txt', 'utf8');
//
//   let email = {
//     Source: "Project Futsal Academy <"+from+">",
//     Destination: { ToAddresses: [to] },
//     ReturnPath: "naikipl@gmail.com",
//     Message: {
//       Subject: { Data: subject },
//       Body: {
//         Html: { Charset: "UTF-8", Data: Mustache.render(html, context) },
//         Text: { Charset: "UTF-8", Data: Mustache.render(txt, context) }
//       }
//     }
//   };
//
//   let ses = new AWS.SES({region: 'us-west-2'});
//   ses.sendEmail(email, function(error, data){
//     if (error) {
//       respond_with(500, error.message);
//     } else {
//       console.log("EMAIL sent to "+to+" ("+data.MessageId+")");
//     }
//   });
// }
//
// function respond_with(code, message){
//   let response = { headers: { "Access-Control-Allow-Origin": "*" } };
//
//   if (code == 200){
//     response.headers.Location = App.host + "/pages/register/success";
//     response.statusCode = 301;
//   } else {
//     response.headers.Location = App.host + "/pages/register";
//     response.statusCode = code;
//   }
//
//   print('RESPONSE', code + ":" + message);
//   App.respond(null, response);
//   return;
// }
//
// function print(head, body){
//   console.log(head + '\n' + JSON.stringify(body, null, 2));
// }