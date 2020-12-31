const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 3000;
const index = require("../public/routes/index");

const app = express();
// use the index.js express function on the default route
app.use(index);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

// const getApiAndEmit = "TODO";
