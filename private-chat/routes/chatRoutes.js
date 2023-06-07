const express = require("express");
const chatController = require("../controllers/chatController");
const router = new express.Router();

/**
 * @swagger
 * /chats:
 *  post:
 *    description: Creates a new chat
 *    responses:
 *      201:
 *        description: A new chat was created
 *      400:
 *        description: Error in creating chat
 */
router.post("/chats", chatController.createChat);

/**
 * @swagger
 * /chats/{id}/messages:
 *  post:
 *    description: Adds a message to a specific chat
 *    responses:
 *      201:
 *        description: A new message was added
 *      400:
 *        description: Error in adding a message
 *      403:
 *        description: User not allowed to post in this chat
 */
router.post("/chats/:id/messages", chatController.addMessage);

/**
 * @swagger
 * /chats:
 *  get:
 *    description: Gets all chats
 *    responses:
 *      200:
 *        description: A list of chats
 *      500:
 *        description: Error in retrieving chats
 */
router.get("/chats", chatController.getChats);

/**
 * @swagger
 * /chats/{id}/messages:
 *  get:
 *    description: Gets messages from a specific chat
 *    responses:
 *      200:
 *        description: A list of messages
 *      404:
 *        description: Chat not found
 *      500:
 *        description: Error in retrieving messages
 */
router.get("/chats/:id/messages", chatController.getChatMessages);

/**
 * @swagger
 * /chats/{id}/conditionalDelete:
 *  delete:
 *    description: Deletes a chat if one user is 'accepted' and the other is 'denied'
 *    responses:
 *      200:
 *        description: Chat successfully deleted
 *      400:
 *        description: Chat cannot be deleted. Statuses do not meet the condition
 *      404:
 *        description: Chat not found
 */
router.delete("/chats/:id/conditionalDelete", chatController.conditionalDeleteChat);

/**
 * @swagger
 * /chats/{id}/participants/{chatId}:
 *  patch:
 *    description: Changes a participant's status in a specific chat
 *    responses:
 *      200:
 *        description: Status updated
 *      404:
 *        description: Chat or participant not found
 */
router.patch("/chats/:id/participants/:chatId", chatController.updateParticipantStatus);

/**
 * @swagger
 * /mychats/{userId}:
 *  get:
 *    description: Gets all chats by a specific user
 *    responses:
 *      200:
 *        description: A list of chats
 *      500:
 *        description: Error in retrieving chats
 */
router.get("/mychats/:userId", chatController.getChatsByUser);

module.exports = router;

