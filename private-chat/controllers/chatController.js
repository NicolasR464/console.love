// const Chat = require("../models/chat");

// //creation de chats
// exports.createChat = async (req, res) => {
//   const chat = new Chat(req.body);
//   try {
//     await chat.save();

//     // Emit an event here when the chat room is created
//     io.emit("new chatroom", chat);

//     res.status(201).send(chat);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// // remplir le champ discussion
// exports.addMessage = async (req, res) => {
//   const chatId = req.params.id;
//   const message = req.body;

//   // Check if the user is in the chat
//   const allowedUsernames = ["cosme", "arthur"];
//   if (!allowedUsernames.includes(message.username)) {
//     return res
//       .status(403)
//       .send({ message: "User not allowed to post in this chat" });
//   }

//   // Find the chat
//   const chat = await Chat.findById(chatId);
//   if (!chat) {
//     return res.status(404).send();
//   }

//   // allow message just for both denied or both accepted
//   const allAccepted = chat.chatters.every(
//     (chatter) => chatter.status === "accepted"
//   );
//   const allDenied = chat.chatters.every(
//     (chatter) => chatter.status === "denied"
//   );

//   if (!(allAccepted || allDenied)) {
//     return res.status(403).send({
//       message:
//         'Both users must have the same status of either "accepted" or "denied" to add a message',
//     });
//   }

//   // Add the message
//   chat.discussion.push(message);
//   await chat.save();

//   res.status(201).send(chat);
// };

// //get all chats

// exports.getChats = async (req, res) => {
//   try {
//     const chats = await Chat.find({});
//     res.send(chats);
//   } catch (error) {
//     res.status(500).send();
//   }
// };

// // get one chat

// exports.getChatMessages = async (req, res) => {
//   try {
//     const chat = await Chat.findById(req.params.id);
//     if (!chat) {
//       return res.status(404).send({ message: "Chat not found" });
//     }
//     res.status(200).send(chat.discussion);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

// // delete chat
// exports.conditionalDeleteChat = async (req, res) => {
//   const chat = await Chat.findById(req.params.id);
//   if (!chat) {
//     return res.status(404).send({ message: "Chat not found" });
//   }

//   // Check if one user is 'accepted' and the other is 'denied'
//   const oneAcceptedOneDenied =
//     chat.chatters.some((chatter) => chatter.status === "accepted") &&
//     chat.chatters.some((chatter) => chatter.status === "denied");

//   if (!oneAcceptedOneDenied) {
//     return res.status(400).send({
//       message: "Chat cannot be deleted. Statuses do not meet the condition.",
//     });
//   }

//   await Chat.findByIdAndDelete(req.params.id);
//   res.status(200).send({ message: "Chat successfully deleted" });
// };

// //change chatter status

// exports.updateParticipantStatus = async (req, res) => {
//   const chat = await Chat.findById(req.params.id);
//   if (!chat) {
//     return res.status(404).send({ message: "Chat not found" });
//   }

//   const participantChatId = req.params.chatId; // Changed to match the route parameter name
//   const { status } = req.body;

//   const participant = chat.chatters.find(
//     (chatter) => chatter.chatId.toString() === participantChatId
//   );

//   if (!participant) {
//     return res
//       .status(404)
//       .send({ message: "Participant not found in this chat" });
//   }

//   participant.status = status;

//   await chat.save();
//   res.status(200).send(chat);
// };

// //get all users chats

// exports.getChatsByUser = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const chats = await Chat.find({ "chatters.chatId": userId });
//     res.send(chats);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };
