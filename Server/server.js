require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const http = require("http");
const server = http.createServer(app);

const socketio = require("socket.io");
const io = socketio(server, {
  cors: { origin: "*" },
});

const router = require("./routes");
app.use(router);

const {
  addUserToRoom,
  deleteUserFromRoom,
  getUser,
  getUsersOfRoom,
} = require("./manager");

io.on("connection", (socket) => {
  console.log("New connection made");

  socket.on("joined", ({ userName, roomName }, callback) => {
    const { error, newUser } = addUserToRoom({
      userId: socket.id,
      userName,
      roomName,
    });

    if (error) {
      return callback(error);
    }

    socket.join(newUser.roomName);

    socket.emit("messageArrived", {
      user: "WeShare",
      text: `Hi ${userName}! Welcome to room: ${roomName}`,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    });

    socket.broadcast.to(newUser.roomName).emit("messageArrived", {
      user: "WeShare",
      text: `${userName} has joined the room`,
      time: new Date().getHours() + ":" + new Date().getMinutes(),
    });

    io.to(newUser.roomName).emit("roomInfo", {
      roomUsers: getUsersOfRoom(newUser.roomName),
    });

    callback();
  });

  socket.on("messageSending", ({ message }) => {
    const user = getUser(message.user);

    io.to(user.roomName).emit("messageArrived", {
      user: `${user.userName}`,
      text: `${message.text} `,
      time: `${new Date().getHours()} ${new Date().getMinutes()}`,
    });
  });

  socket.on("disconnect", () => {
    const user = deleteUserFromRoom(socket.id);

    if (user) {
      socket.broadcast.to(user.roomName).emit("messageArrived", {
        user: "WeShare",
        text: `${user.userName} has left the room`,
        time: `${new Date().getHours()} ${new Date().getMinutes()}`,
      });
      io.to(user.roomName).emit("roomInfo", {
        roomUsers: getUsersOfRoom(user.roomName),
      });
      console.log("User disconnected");
    }
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`WeShare running on port ${port}`);
});
