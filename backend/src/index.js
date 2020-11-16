const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const { generateMessage } = require("./helpers/generateMessage");
const { userService } = require("./services/User");
const { closeSync } = require("fs");

const app = express();
const port = process.env.PORT || 3200;
const server = http.createServer(app);
app.use(cors());

console.log("generateMessage(/)", generateMessage("dupa"));
const io = socketIo(server, { cors: "*" });

let count = 0;
io.on("connection", (socket) => {
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = userService.addUser({
      id: socket.id,
      username,
      room,
    });

    if (error) {
      return callback(error);
    }

    socket.join(room);
    socket.broadcast
      .to(room)
      .emit("message", generateMessage(`${username} has joined !`));

    callback();
  });

  socket.on("sendMessage", (msg, callback) => {
    const user = userService.getUser(socket.id);

    console.log("user", user && user.room);

    if (msg === "fuck") {
      callback("Forbidden word");
      return;
    }

    const msgToSend = generateMessage(msg);

    console.log("emitting event");
    io.to(user.room).emit("message", msgToSend);

    callback();
  });

  socket.on("disconnect", () => {
    const { error, user } = userService.removeUser(socket.id);

    console.log("we are removing", user);

    if (error) {
      return console.error(error);
    }

    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage(`${user.username} has disconnected !`));
  });
});

app.get("/", (req, res) => {
  return res.send("<h1>Server works</h1>");
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
