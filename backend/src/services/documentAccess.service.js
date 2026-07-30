const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');
const { AppError } = require('../middleware/errorHandler');
const { UPLOAD_DIR } = require('./storage.service');

const RECEIPT_TTL_SECONDS = 15 * 60;

function extractRelativePath(fileData) {
  const storedValue = typeof fileData === 'string' ? fileData : fileData?.path || fileData?.url;
  if (!storedValue || typeof storedValue !== 'string') {
    throw new AppError('Lokasi dokumen tidak tersedia', 404);
  }

  let relativePath = storedValue;
  if (/^https?:\/\//i.test(storedValue)) {
    const pathname = new URL(storedValue).pathname;
    const marker = '/uploads/';
    const markerIndex = pathname.indexOf(marker);
    if (markerIndex === -1) throw new AppError('Lokasi dokumen lama tidak valid', 400);
    relativePath = pathname.slice(markerIndex + marker.length);
  } else if (storedValue.includes('/uploads/')) {
    relativePath = storedValue.split('/uploads/').pop();
  }

  try {
    relativePath = decodeURIComponent(relativePath);
  } catch {
    throw new AppError('Encoding lokasi dokumen tidak valid', 400);
  }

  return relativePath.replace(/[\\/]+/g, path.sep);
}

async function resolveStoredDocument(fileData) {
  const rootPath = await fs.realpath(UPLOAD_DIR);
  const relativePath = extractRelativePath(fileData);
  const candidatePath = path.resolve(rootPath, relativePath);
  const rootPrefix = `${rootPath}${path.sep}`;

  if (!candidatePath.startsWith(rootPrefix)) {
    throw new AppError('Lokasi dokumen berada di luar penyimpanan yang diizinkan', 400);
  }

  let realFilePath;
  try {
    realFilePath = await fs.realpath(candidatePath);
  } catch (error) {
    if (error.code === 'ENOENT') throw new AppError('Dokumen tidak ditemukan di penyimpanan', 404);
    throw error;
  }

  if (!realFilePath.startsWith(rootPrefix)) {
    throw new AppError('Dokumen mengarah ke lokasi yang tidak diizinkan', 400);
  }

  const stat = await fs.stat(realFilePath);
  if (!stat.isFile()) throw new AppError('Lokasi dokumen bukan sebuah file', 400);
  return realFilePath;
}

function sanitizeDownloadName(name, fallback = 'dokumen') {
  const baseName = path.basename(String(name || fallback));
  const safeName = baseName.replace(/[\r\n"\\/]/g, '_').slice(0, 180);
  return safeName || fallback;
}

function getSigningSecret() {
  const secret = process.env.DOCUMENT_LINK_SECRET || process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('DOCUMENT_LINK_SECRET atau SESSION_SECRET minimal 32 karakter belum dikonfigurasi');
  }
  return secret;
}

function signReceipt(id, expires) {
  return crypto
    .createHmac('sha256', getSigningSecret())
    .update(`receipt:${id}:${expires}`)
    .digest('base64url');
}

function createReceiptAccess(id, ttlSeconds = RECEIPT_TTL_SECONDS) {
  const expires = Math.floor(Date.now() / 1000) + ttlSeconds;
  return { expires, token: signReceipt(id, expires) };
}

function verifyReceiptAccess(id, expiresValue, token) {
  const expires = Number(expiresValue);
  if (!Number.isInteger(expires) || expires <= Math.floor(Date.now() / 1000) || !token) return false;

  const expected = signReceipt(id, expires);
  const actualBuffer = Buffer.from(String(token));
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(actualBuffer, expectedBuffer);
}

function buildReceiptUrl(id) {
  const baseUrl = (process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 3000}`).replace(/\/$/, '');
  const { expires, token } = createReceiptAccess(id);
  return `${baseUrl}/api/pengajuan/${encodeURIComponent(id)}/bukti?expires=${expires}&token=${encodeURIComponent(token)}`;
}

module.exports = {
  extractRelativePath,
  resolveStoredDocument,
  sanitizeDownloadName,
  createReceiptAccess,
  verifyReceiptAccess,
  buildReceiptUrl,
};
