const axios = require('axios');
const { toZonedTime } = require('date-fns-tz');
const { getDay, getHours } = require('date-fns');
const { JAM_OPERASIONAL, PESAN_BOT } = require('../config/constants');

const GRAPH_API_URL = 'https://graph.facebook.com/v21.0';

/**
 * Cek apakah waktu saat ini berada dalam jam operasional kantor
 * Jam operasional: Senin-Jumat, 08:00 - 15:00 WIB
 * @returns {boolean}
 */
function isOperationalHours() {
  const now = toZonedTime(new Date(), JAM_OPERASIONAL.TIMEZONE);
  const hour = getHours(now);
  const day = getDay(now); // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu

  const isWorkDay = JAM_OPERASIONAL.HARI_KERJA.includes(day);
  const isWorkHour = hour >= JAM_OPERASIONAL.BUKA && hour < JAM_OPERASIONAL.TUTUP;

  return isWorkDay && isWorkHour;
}

/**
 * Dapatkan pesan auto-reply berdasarkan jam operasional
 * @returns {string}
 */
function getAutoReplyMessage() {
  return isOperationalHours()
    ? PESAN_BOT.DALAM_JAM_OPERASIONAL
    : PESAN_BOT.LUAR_JAM_OPERASIONAL;
}

/**
 * Kirim pesan teks ke nomor WhatsApp via Meta Cloud API
 * @param {string} to - Nomor tujuan (format internasional tanpa +, contoh: 6281234567890)
 * @param {string} message - Isi pesan teks
 * @returns {Promise<Object>}
 */
async function sendTextMessage(to, message) {
  const phoneNumberId = process.env.WABA_PHONE_NUMBER_ID;
  const accessToken = process.env.WABA_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    console.error('❌ WABA credentials not configured');
    return null;
  }

  try {
    const response = await axios.post(
      `${GRAPH_API_URL}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`✅ Pesan terkirim ke ${to}`);
    return response.data;
  } catch (error) {
    console.error('❌ Gagal kirim pesan WhatsApp:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Extract informasi pesan dari webhook payload Meta
 * @param {Object} body - Webhook request body
 * @returns {Object|null} - { from, messageBody, messageId, timestamp } atau null
 */
function extractMessageFromWebhook(body) {
  try {
    const entry = body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (!value?.messages || value.messages.length === 0) {
      return null;
    }

    const message = value.messages[0];

    return {
      from: message.from,
      messageBody: message.text?.body || '',
      messageId: message.id,
      timestamp: message.timestamp,
      type: message.type,
    };
  } catch {
    return null;
  }
}

module.exports = {
  isOperationalHours,
  getAutoReplyMessage,
  sendTextMessage,
  extractMessageFromWebhook,
};
