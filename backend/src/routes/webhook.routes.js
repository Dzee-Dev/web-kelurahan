const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhook.controller');

/**
 * GET /webhook/waba
 * Meta webhook verification (challenge handshake)
 */
router.get('/waba', webhookController.verifyWebhook);

/**
 * POST /webhook/waba
 * Receive incoming messages from WhatsApp Business API
 * Body harus di-parse sebagai JSON di sini karena
 * index.js skip json parsing untuk /webhook routes
 */
router.post('/waba', express.json(), webhookController.handleIncomingMessage);

module.exports = router;
