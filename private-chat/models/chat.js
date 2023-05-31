const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  chatters: [
    {
      chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      status: {
        type: String,
        enum: ['denied', 'pending', 'accepted'],
        default: 'pending'
      },
    }
  ],
  discussion: [
    {
      username: String,
      timestamp: {
        type: Date,
        default: Date.now
      },
      body: String,
    }
  ],
});

module.exports = mongoose.model('Chat', chatSchema);