require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const pengajuanRoutes = require('./routes/pengajuan.routes');
const chatRoutes = require('./routes/chat.routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { initWhatsAppBot, getBotStatus } = require('./services/waBot');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Security & Logging ─────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(morgan('dev'));

// ─── CORS ────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Body Parsing ────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Static Files (uploads) ──────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ─── Health Check ────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'web-kelurahan-backend',
    timestamp: new Date().toISOString(),
    whatsapp: getBotStatus(),
  });
});

// ─── API Routes ──────────────────────────────────────────────
app.use('/api/pengajuan', pengajuanRoutes);
app.use('/api/chat', chatRoutes);

// ─── WA Bot Status API ───────────────────────────────────────
app.get('/api/wa-status', (req, res) => {
  res.json({ success: true, data: getBotStatus() });
});

// ─── Error Handling ──────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

// ─── Start Server ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n\ud83c\udfdb\ufe0f  Web Kelurahan Backend (Self-Hosted VPS)`);
  console.log(`   Server: http://localhost:${PORT}`);
  console.log(`   Env: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Uploads: http://localhost:${PORT}/uploads/\n`);

  // Initialize WhatsApp Bot
  if (process.env.ENABLE_WA_BOT !== 'false') {
    initWhatsAppBot();
  } else {
    console.log('   \u26a0\ufe0f WhatsApp Bot disabled (ENABLE_WA_BOT=false)\n');
  }
});

module.exports = app;
