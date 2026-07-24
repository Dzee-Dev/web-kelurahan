const whatsappService = require('../services/whatsapp.service');

/**
 * GET /webhook/waba
 * Verifikasi webhook dari Meta (Challenge handshake)
 */
function verifyWebhook(req, res) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const verifyToken = process.env.WABA_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('✅ Webhook verified');
    return res.status(200).send(challenge);
  }

  console.warn('⚠️ Webhook verification failed');
  return res.status(403).json({ error: 'Verification failed' });
}

/**
 * POST /webhook/waba
 * Handle incoming messages dari WhatsApp Business API
 */
async function handleIncomingMessage(req, res) {
  // Meta mengharuskan kita selalu reply 200 dalam 5 detik
  res.status(200).send('EVENT_RECEIVED');

  try {
    const messageData = whatsappService.extractMessageFromWebhook(req.body);

    if (!messageData) {
      // Bukan event pesan (mungkin status update, dll) — abaikan
      return;
    }

    console.log(`📩 Pesan masuk dari ${messageData.from}: "${messageData.messageBody}"`);

    // Kirim auto-reply berdasarkan jam operasional
    const replyMessage = whatsappService.getAutoReplyMessage();
    await whatsappService.sendTextMessage(messageData.from, replyMessage);

    console.log(`📤 Auto-reply terkirim ke ${messageData.from}`);
  } catch (error) {
    // Log error tapi jangan crash — kita sudah reply 200
    console.error('❌ Error processing webhook:', error.message);
  }
}

module.exports = { verifyWebhook, handleIncomingMessage };
