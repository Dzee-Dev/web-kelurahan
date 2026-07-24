const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

/**
 * POST /api/chat
 * Web Live AI Chatbot Endpoint
 */
router.post('/', chatController.handleChat);

module.exports = router;
