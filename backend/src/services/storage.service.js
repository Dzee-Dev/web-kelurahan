const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { UPLOAD_CONFIG } = require('../config/constants');

// Base upload directory
const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}


/**
 * Upload satu file ke local disk
 */
async function uploadFile(file, folder) {
  const ext = path.extname(file.originalname).toLowerCase();
  const uniqueName = `${uuidv4()}${ext}`;
  const folderPath = path.join(UPLOAD_DIR, folder);
  const filePath = path.join(folderPath, uniqueName);

  // Ensure folder exists
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Write file from buffer
  fs.writeFileSync(filePath, file.buffer);

  const relativePath = `${folder}/${uniqueName}`;

  return {
    path: relativePath,
    originalName: file.originalname,
    mimeType: file.mimetype,
  };
}

/**
 * Upload multiple files (grouped by field name)
 */
async function uploadMultipleFiles(files, baseFolder) {
  const results = {};

  for (const [fieldName, fileArray] of Object.entries(files)) {
    const file = fileArray[0];
    if (file) {
      results[fieldName] = await uploadFile(file, baseFolder);
    }
  }

  return results;
}

/**
 * Upload Buffer PDF ke local disk
 */
async function uploadPdfBuffer(pdfBuffer, filePath) {
  try {
    const fullPath = path.join(UPLOAD_DIR, filePath);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fullPath, pdfBuffer);
    return { path: filePath, mimeType: 'application/pdf' };
  } catch (err) {
    console.error('\u274C Gagal menyimpan PDF:', err.message);
    return null;
  }
}

module.exports = { uploadFile, uploadMultipleFiles, uploadPdfBuffer, UPLOAD_DIR };
