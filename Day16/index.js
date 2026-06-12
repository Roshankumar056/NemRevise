const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const http = require("http");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  },
});
app.use(cors());

let userObj={}
let chatHistory=[]
io.on("connection", (socket) => {
//   console.log("Socket Conneccted", socket.id);
  socket.on("registerName", (name) => {
    userObj[socket.id]=name
    // console.log(userObj);
    io.emit("chatHistory",chatHistory)
    
  });
  socket.on("sendMessage", (message) => {
    // console.log(userObj[socket.id], message);
    let chat={name:[userObj[socket.id]],
        message:message}
    chatHistory.push(chat)
    console.log(chatHistory);
    // socket.emit("chatHistory",chatHistory)
    io.emit("chatHistory",chatHistory)
    
  });
});

server.listen(5000, () => {
  console.log("Server Started");
});
