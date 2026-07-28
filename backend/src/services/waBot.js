const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { generateAiResponse } = require('./ai.service');
const { isOperationalHours } = require('./whatsapp.service');
const { PESAN_BOT } = require('../config/constants');

let client = null;
let isReady = false;
let lastQr = null;

let hasRequestedPairing = false;

/**
 * Inisialisasi WhatsApp Bot Client
 */
function initWhatsAppBot() {
  client = new Client({
    authStrategy: new LocalAuth({ dataPath: '.wwebjs_auth' }),
    webVersionCache: {
      type: 'remote',
      remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    },
    qrMaxRetries: 15, // 15 retries * ~20s = ~5 minutes
    puppeteer: {
      headless: 'new',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-blink-features=AutomationControlled',
      ],
    },
  });

  client.on('qr', async (qr) => {
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
    console.log('🔐 WhatsApp Bot authenticated');
    // Debugging: ambil screenshot jika tersangkut lebih dari 15 detik
    setTimeout(async () => {
      if (!isReady && client.pupPage) {
        try {
          const path = require('path');
          const debugPath = path.join(__dirname, '..', '..', 'uploads', 'wa-debug.png');
          console.log('⚠️ Mengambil screenshot layar WA Web untuk debugging...');
          await client.pupPage.screenshot({ path: debugPath });
          console.log('✅ Screenshot tersimpan di /uploads/wa-debug.png.');
        } catch (err) {
          console.error('Gagal mengambil screenshot', err);
        }
      }
    }, 15000);
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
      const textUpper = incomingText.toUpperCase();
      if (textUpper.includes('PENGAJUAN SURAT') && textUpper.includes('TRACKING ID')) {
        const inWorkHours = isOperationalHours();
        const reply = inWorkHours ? PESAN_BOT.DALAM_JAM_OPERASIONAL : PESAN_BOT.LUAR_JAM_OPERASIONAL;

        await message.reply(reply);
        console.log(`\ud83d\udce4 Auto-reply terkirim ke ${message.from} (${inWorkHours ? 'Dalam Jam Kerja' : 'Luar Jam Kerja'})`);
        return; 
      }

      // Jika pesan biasa (bukan format web), bot akan DIAM (tidak membalas apapun)
      // Ini mencegah bot membalas pesan pribadi (teman/keluarga) dan mencegah akun diblokir.
      console.log(`\ud83d\udeab Pesan diabaikan (bukan format pengajuan)`);

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
