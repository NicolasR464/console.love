const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chatRoutes');
const { Server } = require('socket.io');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const mongoUrl = process.env.MONGO_URL;


mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.use(cors());

app.use(express.json());

app.use(chatRoutes);

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["*"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('chat message', async (message) => {
    // the message should include the chatroomId and username
    const { chatroomId, username, body } = message;
    
    // send a HTTP request to store the message in the database
    const response = await axios.post(`http://localhost:3001/chats/646e2097d935a8b4ed7afaa4/messages`, {
      username,
      body
    });

    // if there was an error saving the message, log it and return
    if (response.status !== 201) {
      console.error('Error saving message:', response.data);
      return;
    }

    // if the message was saved successfully, emit it back to all clients
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});









