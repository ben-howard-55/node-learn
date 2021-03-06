const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 3000;
const index = require("../public/routes/index");

const app = express();
// use the index.js express function on the default route
app.use(index);
// create http server
const server = http.createServer(app);
// create socket server
const io = socketIo(server);

let interval;

// logic for connecting socket.
io.on("connection", (socket) => {
  console.log("New Client Connected");
  if (interval) {
    clearInterval(interval);
  }

  // set up time out for sending date information. Sends every second.
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  // on disconnect clear the interval
  socket.on("disconnect", () => {
    console.log("Client Disconnected");
    clearInterval(interval);
  });
});

// send a message to be consumed by the clients
const getApiAndEmit = (socket) => {
  const response = new Date();
  // emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

// start server
server.listen(port, () => console.log(`Listening on port ${port}`));
