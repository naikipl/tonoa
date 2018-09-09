var index = require("../dist/index.js");

const event = {
  "body": "redirect=http://google.com&to[]=info@example.com&from=info@example.com&subject=Test Email&html=<body></body>&text=Hi",
  "stageVariables": {
    "region": "us-west-2"
  }
}

index.handler(event, {}, console.log)