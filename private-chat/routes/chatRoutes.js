const express = require("express");
const chatController = require("../controllers/chatController");
const router = new express.Router();

router.post("/chats", chatController.createChat);
router.post("/chats/:id/messages", chatController.addMessage);
router.get("/chats", chatController.getChats);
router.get("/chats/:id/messages", chatController.getChatMessages);
router.delete(
  "/chats/:id/conditionalDelete",
  chatController.conditionalDeleteChat
);
router.patch(
  "/chats/:id/participants/:chatId",
  chatController.updateParticipantStatus
);
router.get("/mychats/:userId", chatController.getChatsByUser);

module.exports = router;
