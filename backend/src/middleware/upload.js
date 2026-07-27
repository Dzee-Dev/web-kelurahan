const multer = require('multer');
const { UPLOAD_CONFIG } = require('../config/constants');

/**
 * Multer configuration — memory storage
 * File disimpan di memory buffer dulu, lalu storage.service.js
 * yang menulisnya ke disk agar path bisa dikontrol.
 */
const storage = multer.memoryStorage();

/**
 * Filter file berdasarkan MIME type yang diizinkan
 */
function fileFilter(_req, file, cb) {
  if (UPLOAD_CONFIG.ALLOWED_MIMES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Tipe file "${file.originalname}" tidak diizinkan. Hanya menerima: JPG, PNG, WebP, dan PDF.`
      ),
      false
    );
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: UPLOAD_CONFIG.MAX_FILE_SIZE,
    files: UPLOAD_CONFIG.MAX_FILES,
  },
});

module.exports = upload;
