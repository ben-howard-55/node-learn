const express = require("express");
const http = require("http");
const path = require("path");

// init express function app
var app = express();

// create http server, that the express function is passed to
var server = http.createServer(app);

// use path.join() to create a longer path to the index
let public = path.join(__dirname, "../public");

// allow express to access files in folder
app.use(express.static(public));

// define route handler that is called on website home route
app.get("", (req, res) => {
  res.sendFile(public + "/index.html"); // send index.html file to home route
});

// make server listen to port 3000
server.listen(3000, () => {
  console.log("listening to port: *3000");
});
