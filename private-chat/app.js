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
  console.log(`User Connected: ${socket.id} : ${new Date()}`);

  socket.on("create-room", async (chatData) => {
    try {
      // Create a new chat room
      const newChat = new Chat(chatData);
      const savedChat = await newChat.save();

      // Emit the 'chat room created' event back to the client with the room id
      socket.emit("chat room created", savedChat._id.toString());

      // Emit the 'new chat room' event to all connected clients
      io.emit("new chat room", savedChat);
      // console.log("response from savechat", savedChat);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("fetch chat rooms", async (userId) => {
    try {
      const chatRooms = await Chat.find({ "chatters.chatId": userId });
      socket.emit("chat rooms", chatRooms);
      // console.log("room fetch", chatRooms);
      // console.log("room fetch userID", userId);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("update-chat-status", async ({ roomId, status }) => {
    try {
      const chatRoom = await Chat.findById(roomId);

      if (!chatRoom) {
        console.log(`Chat room not found for roomId: ${roomId}`);
        return;
      }

      //YOU ARE HERE, MUST GET USERID (from Session pass it as prop if necessary)
      // console.log("chatRoom", chatRoom);
      // chatRoom.chatters.forEach((chatter) => {
      //   chatter.status = status;
      // });

      // await chatRoom.save();

      // Emit the updated chat room data to all clients in the room
      io.to(roomId).emit("room-data", chatRoom);
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

  socket.on("join-room", (roomId) => {
    console.log(`Socket ${socket.id} joining room ${roomId}`);
    socket.join(roomId);
  });

  socket.on("leave-room", (roomId) => {
    console.log(`Socket ${socket.id} leaving room ${roomId}`);
    socket.leave(roomId);
  });

  socket.on("chat message", async (message, roomId) => {
    console.log("new message", message);
    console.log("in room", roomId);
    try {
      // Fetch the chat room from the database
      const chatRoom = await Chat.findById(roomId);

      // Check if the chat room exists
      if (!chatRoom) {
        console.log(`Chat room not found for roomId: ${roomId}`);
        return;
      }

      // Fetch the status of both the chatters
      const chatterStatuses = chatRoom.chatters.map(
        (chatter) => chatter.status
      );

      // If both users' status are not "accepted", they cannot chat
      if (chatterStatuses.some((status) => status !== "accepted")) {
        socket.emit("chat error", "Waiting for quiz completion");
        return;
      }

      // Append the message to the discussion
      chatRoom.discussion.push(message);
      await chatRoom.save();

      // Emit the 'chat message' event to all clients in the same room
      socket.to(roomId).emit("chat message", message);
      io.emit("chat list", message, roomId);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("update-chat-status", async ({ roomId, status }, session) => {
    try {
      console.log("USER RESPONSE", roomId, status, session);
      const chatRoom = await Chat.findById(roomId);

      if (!chatRoom) {
        console.log(`Chat room not found for roomId: ${roomId}`);
        return;
      }

      // Find the chatter whose chatId matches the current user's session ID
      const currentUserChatter = chatRoom.chatters.find(
        (chatter) => chatter.chatId.toString() === session
      );

      if (!currentUserChatter) {
        console.log(`Current user chatter not found for roomId: ${roomId}`);
        return;
      }
      console.log("Chatroom before update", chatRoom.chatters);
      currentUserChatter.status = status;
      console.log("Chatroom after update", chatRoom.chatters);
      await chatRoom.save();

      // Emit the updated chat room data to the current user
      io.to(roomId).emit("room-data", chatRoom);
    } catch (err) {
      console.error(err);
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
