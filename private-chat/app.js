const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");
const Chat = require("./models/chat"); // Added import for Chat model
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;
const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});

// New socket.io connection handling
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("create-room", async (chatData) => {
    try {
      // Create a new chat room
      const newChat = new Chat(chatData);
      const savedChat = await newChat.save();

      // Emit the 'chat room created' event back to the client with the room id
      socket.emit("chat room created", savedChat._id.toString());

      // Emit the 'new chat room' event to all connected clients
      io.emit("new chat room", savedChat);
      console.log("response from savechat", savedChat);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("fetch chat rooms", async (userId) => {
    try {
      const chatRooms = await Chat.find({ "chatters.chatId": userId });
      socket.emit("chat rooms", chatRooms);
      console.log("room fetch", chatRooms);
      console.log("room fetch userID", userId);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("fetch-room", async (roomId) => {
    try {
      const room = await Chat.findById(roomId);
      socket.emit("room-data", room);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("chat message", async (message, roomId) => {
    try {
      // Save the message in the chat room in the database
      const chatRoom = await Chat.findById(roomId);

      // Check if the chat room exists
      if (!chatRoom) {
        console.log(`Chat room not found for roomId: ${roomId}`);
        return;
      }

      chatRoom.discussion.push(message);
      await chatRoom.save();

      // Emit the 'chat message' event to all connected clients
      io.emit("chat message", message);
    } catch (err) {
      console.error(err);
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
