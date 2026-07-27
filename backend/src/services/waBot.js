const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { generateAiResponse } = require('./ai.service');
const { isOperationalHours } = require('./whatsapp.service');

let client = null;
let isReady = false;
let lastQr = null;

/**
 * Inisialisasi WhatsApp Bot Client
 */
function initWhatsAppBot() {
  client = new Client({
    authStrategy: new LocalAuth({ dataPath: '.wwebjs_auth' }),
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--single-process',
      ],
    },
  });

  client.on('qr', (qr) => {
    lastQr = qr;
    console.log('\n\ud83d\udcf1 Scan QR Code berikut dengan WhatsApp Kelurahan:');
    qrcode.generate(qr, { small: true });
    console.log('\n');
  });

  client.on('ready', () => {
    isReady = true;
    lastQr = null;
    console.log('\u2705 WhatsApp Bot connected dan siap menerima pesan!');
  });

  client.on('authenticated', () => {
    console.log('\ud83d\udd10 WhatsApp Bot authenticated');
  });

  client.on('auth_failure', (msg) => {
    isReady = false;
    console.error('\u274C WhatsApp auth gagal:', msg);
  });

  client.on('disconnected', (reason) => {
    isReady = false;
    console.warn('\u26a0\ufe0f WhatsApp Bot disconnected:', reason);
    // Auto-reconnect setelah 5 detik
    setTimeout(() => {
      console.log('\ud83d\udd04 Mencoba reconnect WhatsApp Bot...');
      client.initialize();
    }, 5000);
  });

  // Auto-reply pesan masuk
  client.on('message', async (message) => {
    // Abaikan pesan dari group, status, dan broadcast
    if (message.isGroupMsg || message.isStatus || message.broadcast) return;

    try {
      const incomingText = message.body || '';
      console.log(`\ud83d\udce9 Pesan masuk dari ${message.from}: "${incomingText}"`);

      // 1. Cek apakah ini adalah pesan pengajuan dari Web
      if (incomingText.includes('PENGAJUAN SURAT KELURAHAN ONLINE') && incomingText.includes('Kode Tracking ID')) {
        const reply = '✅ *Terima Kasih!*\nBerkas pengajuan surat Anda telah masuk ke sistem kami dan akan segera diverifikasi oleh Admin Kelurahan.\n\nAnda dapat memantau status surat Anda secara berkala melalui menu Tracking di website kami.';
        await message.reply(reply);
        console.log(`\ud83d\udce4 Auto-reply penerimaan surat terkirim ke ${message.from}`);
        return; // Stop di sini, jangan dilempar ke AI
      }

      // 2. Generate AI response untuk pertanyaan umum
      let reply = '';
      if (incomingText.trim().length > 3) {
        reply = await generateAiResponse(incomingText);
        const statusNote = isOperationalHours()
          ? '\n\n---\n*Status Kantor:* \ud83d\udfe2 Jam Operasional (08:00 - 15:00 WIB)'
          : '\n\n---\n*Status Kantor:* \ud83d\udd34 Luar Jam Operasional. Pesan akan ditindaklanjuti hari kerja berikutnya.';
        reply += statusNote;
      } else {
        reply = isOperationalHours()
          ? 'Terima kasih, laporan Anda telah kami terima. Admin kami akan segera merespons.'
          : 'Mohon maaf, saat ini di luar jam operasional kantor. Pesan Anda akan diproses pada hari kerja berikutnya mulai pukul 08:00 WIB.';
      }

      await message.reply(reply);
      console.log(`\ud83d\udce4 Auto-reply terkirim ke ${message.from}`);
    } catch (err) {
      console.error('\u274C Error auto-reply:', err.message);
    }
  });

  console.log('\ud83d\ude80 Initializing WhatsApp Bot...');
  client.initialize();
}

/**
 * Kirim pesan ke nomor tertentu
 * @param {string} to - Nomor tujuan (format: 6281234567890)
 * @param {string} message - Isi pesan
 */
async function sendMessage(to, message) {
  if (!client || !isReady) {
    console.warn('\u26a0\ufe0f WhatsApp Bot belum ready, pesan tidak terkirim');
    return null;
  }

  try {
    // whatsapp-web.js format: nomor@c.us
    const chatId = to.includes('@c.us') ? to : `${to}@c.us`;
    const result = await client.sendMessage(chatId, message);
    console.log(`\u2705 Pesan terkirim ke ${to}`);
    return result;
  } catch (err) {
    console.error(`\u274C Gagal kirim pesan ke ${to}:`, err.message);
    return null;
  }
}

/**
 * Get bot status (untuk API/Admin Dashboard)
 */
function getBotStatus() {
  return {
    isReady,
    hasQr: !!lastQr,
    qr: lastQr,
  };
}

module.exports = { initWhatsAppBot, sendMessage, getBotStatus };
