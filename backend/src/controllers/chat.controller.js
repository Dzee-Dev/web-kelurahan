const { generateAiResponse } = require('../services/ai.service');

/**
 * POST /api/chat
 * Web Live AI Chatbot Endpoint
 */
async function handleChat(req, res, next) {
  try {
    const { message } = req.body;

    if (!message || String(message).trim() === '') {
      return res.status(400).json({
        success: false,
        error: { message: 'Pesan wajib diisi' },
      });
    }

    const aiReply = await generateAiResponse(message);

    res.json({
      success: true,
      data: {
        reply: aiReply,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { handleChat };
