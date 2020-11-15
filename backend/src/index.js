const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const { generateMessage } = require("./helpers/generateMessage");

const app = express();
const port = process.env.PORT || 3200;
const server = http.createServer(app);
app.use(cors());

const io = socketIo(server, { cors: "*" });

let count = 0;
io.on("connection", (socket) => {
  socket.on("join", ({ username, room }) => {
    socket.join(room);
    socket.broadcast
      .to(room)
      .emit("message", generateMessage(`${username} has joined !`));
  });

  socket.on("sendMessage", (msg, cb) => {
    if (msg === "fuck") {
      cb("Forbidden word");
      return;
    }

    const msgToSend = generateMessage(msg);

    socket.emit("message", msgToSend);
  });

  socket.on("disconnect", () => {
    socket.broadcast
      .to(room)
      .emit("message", generateMessage(`${username} has disconnected !`));
  });
});

app.get("/", (req, res) => {
  return res.send("<h1>Server works</h1>");
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
