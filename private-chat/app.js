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

let userIdToSocketId = {};

// New socket.io connection handling
io.on("connection", (socket) => {
  const userId = socket.handshake.auth.session;
  socket.userId = userId;
  userIdToSocketId[userId] = socket.id;

  console.log(
    `User Connected: SocketID = ${
      socket.id
    }, UserID = ${userId} : ${new Date()}`
  );

  socket.on("disconnect", () => {
    console.log(
      `User Disconnected: SocketID = ${
        socket.id
      }, UserID = ${userId} : ${new Date()}`
    );
  });

  // Log if the socket has reconnected.
  socket.on("reconnect", (attemptNumber) => {
    console.log(
      `User Reconnected: SocketID = ${
        socket.id
      }, UserID = ${userId} after ${attemptNumber} attempts : ${new Date()}`
    );
  });

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

  // FETCH ROOM CONTROL
  socket.on("UNMATCH", () => {
    console.log("UNMACH RECEIVED"),
      console.log("ALLO SENT", socket.emit("ALLO"));
  });
  socket.on("fetch chat rooms", async (userId) => {
    try {
      const chatRooms = await Chat.find({ "chatters.chatId": userId });
      console.log("chat rooms updated for socket", socket.id);
      socket.emit("chat rooms", chatRooms);
      console.log("chat rooms updated for socket", socket.id);
      console.log("chat rooms updated", chatRooms.length);

      // console.log("room fetch userID", userId);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("fetch-room", async (roomId) => {
    try {
      const room = await Chat.findById(roomId);
      socket.emit("room-data", room);
      socket.emit("room-profile", room);
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

  // CHAT MESSAGE CONTROL

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

  // MATCH CONTROL
  socket.on("fetch match", async (userId) => {
    try {
      console.log(`Fetching matches for userId: ${userId}`);

      const initialMatches = await Chat.find({
        chatters: { $elemMatch: { chatId: userId } },
      });

      const finalMatches = initialMatches.filter((match) =>
        match.chatters.every((chatter) => chatter.status === "accepted")
      );

      socket.emit("matches", finalMatches);
    } catch (err) {
      console.error(`An error occurred: ${err}`);
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

      const currentUserChatter = chatRoom.chatters.find(
        (chatter) => chatter.chatId.toString() === session
      );

      if (!currentUserChatter) {
        console.log(`Current user chatter not found for roomId: ${roomId}`);
        return;
      }

      currentUserChatter.status = status;
      await chatRoom.save();

      // Check if both chatters have accepted the match
      if (chatRoom.chatters.every((chatter) => chatter.status === "accepted")) {
        console.log("Both users accepted the match!");

        chatRoom.chatters.forEach((chatter) => {
          let targetSocketId = userIdToSocketId[chatter.chatId];
          if (targetSocketId) {
            io.to(targetSocketId).emit("new match", chatRoom);
          }
        });
      } else if (
        chatRoom.chatters.some((chatter) => chatter.status === "denied")
      ) {
        // check if any chatter denied the match
        console.log("A user denied the match!");

        let deniedUserId = null;

        chatRoom.chatters.forEach((chatter) => {
          if (chatter.status === "denied") {
            console.log("chatter that denied", chatter);
            deniedUserId = chatter.chatId;
          }
        });

        chatRoom.chatters.forEach((chatter) => {
          let targetSocketId = userIdToSocketId[chatter.chatId];

          if (targetSocketId) {
            console.log("i m going to unmatch");
            io.to(targetSocketId).emit("unmatch", {
              chatRoom,
              deniedUserId,
            });
          }
        });
      }

      // Emit the updated chat room data to the current user

      chatRoom.chatters.forEach((chatter) => {
        let targetSocketId = userIdToSocketId[chatter.chatId];

        if (targetSocketId) {
          console.log("sending roomdata", targetSocketId, chatRoom);

          io.to(targetSocketId).emit("room-data", chatRoom);
        }
      });
    } catch (err) {
      console.error(err);
    }
  });

  app.delete("/rooms/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
      // Find the rooms to delete and store their IDs
      const roomsToDelete = await Chat.find({ "chatters.chatId": userId });
      const roomIdsToDelete = roomsToDelete.map((room) => room._id);

      // If there are no rooms to delete, send a specific response
      if (roomIdsToDelete.length === 0) {
        return res.status(200).send({ message: "No rooms to delete." });
      }

      // Delete the rooms
      await Chat.deleteMany({ "chatters.chatId": userId });

      // Return the IDs of the deleted rooms
      return res.status(200).send({
        message: "Rooms deleted successfully.",
        deletedRoomIds: roomIdsToDelete,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .send({ message: "Error occurred while deleting rooms." });
    }
  });

  app.delete("/room/:roomId", async (req, res) => {
    const roomId = req.params.roomId;
    try {
      // Check if the room exists
      const room = await Chat.findById(roomId);

      // If there's no room, send a specific response
      if (!room) {
        return res.status(404).send({ message: "Room not found." });
      }

      // Delete the room
      await Chat.deleteOne({ _id: roomId });

      // Return the ID of the deleted room
      return res.status(200).send({
        message: "Room deleted successfully.",
        deletedRoomId: roomId,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .send({ message: "Error occurred while deleting the room." });
    }
  });

  // // NEW MATCH
  // socket.on("new match", async ({ roomId }) => {
  //   try {
  //     let chatRoom = await Chat.findById(roomId);

  //     if (!chatRoom) {
  //       console.log(`Chat room not found for roomId: ${roomId}`);
  //       return;
  //     }

  //     // Log each chatter's chatId and status
  //     chatRoom.chatters.forEach((chatter, index) => {
  //       console.log(
  //         `Chatter ${index + 1} ChatID: ${chatter.chatId}, Status: ${
  //           chatter.status
  //         }`
  //       );
  //     });

  //     const allChattersAccepted = chatRoom.chatters.every(
  //       (chatter) => chatter.status === "accepted"
  //     );

  //     console.log(`All chatters accepted: ${allChattersAccepted}`);

  //     if (allChattersAccepted) {
  //       // Emit new match event to the involved users
  //       chatRoom.chatters.forEach((chatter) => {
  //         console.log(`Emitting new match event to ChatID: ${chatter.chatId}`);
  //         io.to(chatter.chatId).emit("new match", chatRoom);
  //       });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
