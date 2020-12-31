const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

// init express function app
var app = express();

// create http server, that the express function is passed to
var server = http.createServer(app);

// init an instance of socket.io and pass the http server to it
var io = socketIO(server);

// use path.join() to create a longer path to the index
let public = path.join(__dirname, "../public");

// allow express to access files in folder
app.use(express.static(public));

// define route handler that is called on website home route
app.get("", (req, res) => {
  res.sendFile(public + "/index.html"); // send index.html file to home route
});

// listen for incoming sockets using `connection`, this will be called when a client tries to connect
io.on("connection", (socket) => {
  console.log("A user connected");

  // listen for a chat message, and print the message value
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    // emit to all connected clients the message
    io.emit("chat message", msg);
  });

  // listen for disconnect of a socket.
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// make server listen to port 3000
server.listen(3000, () => {
  console.log("listening to port: *3000");
});
