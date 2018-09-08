var app = require("../dist/main.js");

var lambdaContext = {
  succeed: function succeed(results) {
    console.log(results);
    process.exit(0);
  }
};

app.hello({name: "bob"}, lambdaContext);