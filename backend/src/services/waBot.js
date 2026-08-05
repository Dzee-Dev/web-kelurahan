const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const path = require('path');
const fs = require('fs');
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
  const clientId = process.env.WA_BOT_CLIENT_ID || 'admin-6285287434646';

  client = new Client({
    authStrategy: new LocalAuth({
      clientId,
      dataPath: '.wwebjs_auth',
    }),
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
          console.log(`✅ Screenshot debug tersimpan lokal di ${debugPath}.`);
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

  const processedMessageIds = new Set();

  // Auto-reply pesan masuk (Pengajuan & Salam/Bantuan)
  const handleIncomingMessage = async (message) => {
    // Abaikan jika pesan dari group, status, broadcast, atau dikirim oleh bot itu sendiri
    if (message.isGroupMsg || message.isStatus || message.broadcast || message.fromMe) return;

    // Cegah balasan ganda dengan mendeduplikasi Message ID
    const msgId = message.id?._serialized || message.id?.id || `${message.from}_${message.timestamp}`;
    if (processedMessageIds.has(msgId)) return;
    processedMessageIds.add(msgId);

    // Batasi ukuran set agar tidak menumpuk memori
    if (processedMessageIds.size > 2000) {
      const firstItem = processedMessageIds.values().next().value;
      processedMessageIds.delete(firstItem);
    }

    try {
      const incomingText = (message.body || '').trim();
      if (!incomingText) return;

      console.log(`\ud83d\udce9 Pesan masuk dari ${message.from}: "${incomingText}"`);

      const textUpper = incomingText.toUpperCase();
      const inWorkHours = isOperationalHours();
      let reply = null;

      // 1. Pesan pengajuan dari Web
      if (textUpper.includes('PENGAJUAN SURAT') || textUpper.includes('TRACKING ID') || textUpper.includes('TRACKING')) {
        reply = inWorkHours ? PESAN_BOT.DALAM_JAM_OPERASIONAL : PESAN_BOT.LUAR_JAM_OPERASIONAL;
      } 
      // 2. Pesan salam / halo / tes / info / bantuan
      else if (
        textUpper.includes('HALO') || textUpper.includes('HAI') || 
        textUpper.includes('ASSALAMU') || textUpper.includes('TES') || 
        textUpper.includes('HELP') || textUpper.includes('BANTU') ||
        textUpper.includes('SURAT') || textUpper.includes('INFO') ||
        textUpper.includes('MANA') || textUpper.includes('PAGI') ||
        textUpper.includes('SIANG') || textUpper.includes('SORE')
      ) {
        reply = inWorkHours
          ? `👋 *Selamat Datang di Pelayanan Kelurahan Mesjid Priyayi*\n\nAda yang bisa kami bantu? Untuk mengajukan surat kependudukan secara online (SKTM, Surat Domisili, Surat Kematian), silakan kunjungi portal resmi kami:\n🌐 https://web-kelurahan-blush.vercel.app/\n\n📌 *Jam Pelayanan Kantor:* Senin – Jumat (08.00 – 15.00 WIB)`
          : `👋 *Selamat Datang di Pelayanan Kelurahan Mesjid Priyayi*\n\nMohon maaf, saat ini kantor sedang *di luar jam operasional*. Pesan Anda akan dibaca oleh petugas pada hari kerja berikutnya.\n\nAnda tetap dapat membuat pengajuan surat online 24 jam melalui portal resmi kami:\n🌐 https://web-kelurahan-blush.vercel.app/\n\n📌 *Jam Pelayanan Kantor:* Senin – Jumat (08.00 – 15.00 WIB)`;
      }

      if (reply) {
        const logoPath = path.join(__dirname, '..', 'assets', 'logo-serang.png');
        if (fs.existsSync(logoPath)) {
          const media = MessageMedia.fromFilePath(logoPath);
          await client.sendMessage(message.from, media, { caption: reply });
        } else {
          await message.reply(reply);
        }
        console.log(`\ud83d\udce4 Auto-reply + Gambar Logo terkirim ke ${message.from} (${inWorkHours ? 'Dalam Jam Kerja' : 'Luar Jam Kerja'})`);
      } else {
        console.log(`\ud83d\udeab Pesan diabaikan (bukan format pengajuan atau salam)`);
      }

    } catch (err) {
      console.error('\u274C Error auto-reply:', err.message);
    }
  };

  client.on('message', handleIncomingMessage);

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
 * Kirim file privat sebagai attachment WhatsApp.
 */
async function sendMediaFile(to, filePath, options = {}) {
  if (!client || !isReady) {
    console.warn('⚠️ WhatsApp Bot belum ready, attachment tidak terkirim');
    return null;
  }

  const resolvedPath = path.resolve(filePath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ Attachment tidak ditemukan: ${resolvedPath}`);
    return null;
  }

  try {
    const loadedMedia = MessageMedia.fromFilePath(resolvedPath);
    const media = options.filename
      ? new MessageMedia(loadedMedia.mimetype, loadedMedia.data, options.filename, loadedMedia.filesize)
      : loadedMedia;
    const chatId = to.includes('@c.us') ? to : `${to}@c.us`;
    const result = await client.sendMessage(chatId, media, {
      caption: options.caption || '',
    });
    console.log(`✅ Attachment "${options.filename || path.basename(resolvedPath)}" terkirim ke ${to}`);
    return result;
  } catch (error) {
    console.error(`❌ Gagal kirim attachment ke ${to}:`, error.message);
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

module.exports = { initWhatsAppBot, sendMessage, sendMediaFile, getBotStatus };
