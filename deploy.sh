#!/bin/bash
# ============================================
# Panduan Deploy Web Kelurahan di Ubuntu 24.04 VPS
# ============================================

set -e

echo "🏛️  Web Kelurahan Mesjid Priyayi — VPS Setup"
echo "============================================"

# ── 1. UPDATE SYSTEM ──
echo "📦 Updating system..."
sudo apt update && sudo apt upgrade -y

# ── 2. INSTALL NODE.JS 20 ──
echo "📦 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
echo "   Node.js version: $(node -v)"
echo "   npm version: $(npm -v)"

# ── 3. INSTALL POSTGRESQL ──
echo "📦 Installing PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib

# Start dan enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Buat user dan database
echo "📦 Setting up PostgreSQL database..."
sudo -u postgres psql <<EOF
CREATE USER kelurahan_user WITH PASSWORD 'kelurahan_pass';
CREATE DATABASE web_kelurahan OWNER kelurahan_user;
GRANT ALL PRIVILEGES ON DATABASE web_kelurahan TO kelurahan_user;
\c web_kelurahan
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
EOF

echo "   ✅ Database 'web_kelurahan' created"

# ── 4. INSTALL CHROMIUM (untuk whatsapp-web.js / Puppeteer) ──
echo "📦 Installing Chromium for WhatsApp Bot..."
sudo apt install -y chromium-browser
# Jika tidak ada chromium-browser, coba:
# sudo apt install -y chromium

# ── 5. INSTALL PM2 ──
echo "📦 Installing PM2 (Process Manager)..."
sudo npm install -g pm2

# ── 6. INSTALL NGINX (Reverse Proxy) ──
echo "📦 Installing Nginx..."
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# ── 7. CLONE PROJECT ──
echo "📦 Cloning project..."
cd /home
if [ ! -d "web-kelurahan" ]; then
  git clone https://github.com/Dzee-Dev/web-kelurahan.git
fi
cd web-kelurahan

# ── 8. SETUP BACKEND ──
echo "📦 Setting up Backend..."
cd backend
cp .env.example .env
echo "⚠️  EDIT backend/.env — sesuaikan DATABASE_URL, BACKEND_URL, WA_ADMIN_PHONE"

npm install

# Jalankan migration SQL
echo "📦 Running database migration..."
sudo -u postgres psql -d web_kelurahan -f src/database/migration.sql

echo "   ✅ Backend ready"

# ── 9. SETUP FRONTEND ──
echo "📦 Setting up Frontend..."
cd ../frontend
cp .env.local.example .env.local 2>/dev/null || true
echo "⚠️  EDIT frontend/.env.local — sesuaikan NEXT_PUBLIC_BACKEND_URL"

npm install
npm run build

echo "   ✅ Frontend ready"

# ── 10. START DENGAN PM2 ──
echo "📦 Starting services with PM2..."
cd /home/web-kelurahan

# Backend (port 3000)
pm2 start backend/src/index.js --name "kelurahan-backend" --env production

# Frontend (port 3001)
pm2 start npm --name "kelurahan-frontend" -- run start --prefix frontend

# Save PM2 config untuk auto-start saat reboot
pm2 save
pm2 startup

echo ""
echo "============================================"
echo "✅ DEPLOYMENT SELESAI!"
echo "============================================"
echo ""
echo "📍 Backend API:   http://YOUR_VPS_IP:3000"
echo "📍 Frontend Web:  http://YOUR_VPS_IP:3001"
echo "📍 Health Check:  http://YOUR_VPS_IP:3000/health"
echo ""
echo "⚠️  LANGKAH SELANJUTNYA:"
echo "   1. Edit backend/.env (DATABASE_URL, BACKEND_URL, WA_ADMIN_PHONE)"
echo "   2. Edit frontend/.env.local (NEXT_PUBLIC_BACKEND_URL)"
echo "   3. Restart: pm2 restart all"
echo "   4. Lihat log QR WhatsApp: pm2 logs kelurahan-backend"
echo "   5. Scan QR Code dengan HP admin kelurahan"
echo ""
echo "📋 PERINTAH PM2 BERGUNA:"
echo "   pm2 status          — Lihat status semua service"
echo "   pm2 logs            — Lihat semua log"
echo "   pm2 restart all     — Restart semua service"
echo "   pm2 stop all        — Stop semua service"
echo ""
