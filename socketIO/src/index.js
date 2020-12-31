const express = require("express");
const http = require("http");

// init express function app
var app = express();

// create http server, that the express function is passed to
var server = http.createServer(app);

// define route handler that is called on website home route
app.get("", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// make server listen to port 3000
server.listen(3000, () => {
  console.log("listening to port: *3000");
});
