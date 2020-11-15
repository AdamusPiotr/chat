const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3200;
const server = http.createServer(app);
app.use(cors());

const io = socketIo(server, { cors: "*" });

let count = 0;
io.on("connection", (socket) => {
  socket.broadcast.emit("message", "New user connected");

  socket.on("increment", () => {
    io.emit("countUpdated", ++count);
  });

  socket.on("sendMessage", (msg, cb) => {
    if (msg === "fuck") {
      cb("Forbidden word");
      return;
    }

    socket.emit("message", msg);
  });

  socket.on("sendLocation", (cords) => {
    console.log("cords", cords);
    socket.emit(
      "message",
      `https://google.com/maps?q=${cords.latitude},${cords.longitude}`
    );
  });

  socket.on("disconnect", () => {
    socket.emit("message", "User has disconnected");
  });
});

app.get("/", (req, res) => {
  return res.send("<h1>Server works</h1>");
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
