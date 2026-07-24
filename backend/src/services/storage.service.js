const supabase = require('../config/supabase');
const { UPLOAD_CONFIG } = require('../config/constants');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

/**
 * Upload satu file ke Supabase Storage
 * @param {Object} file - Multer file object (buffer, originalname, mimetype)
 * @param {string} folder - Subfolder di bucket (misal: sktm/nik_timestamp)
 * @returns {Promise<{path: string, url: string}>}
 */
async function uploadFile(file, folder) {
  const ext = path.extname(file.originalname).toLowerCase();
  const uniqueName = `${uuidv4()}${ext}`;
  const filePath = `${folder}/${uniqueName}`;

  const { data, error } = await supabase.storage
    .from(UPLOAD_CONFIG.BUCKET_NAME)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(`Gagal upload file "${file.originalname}": ${error.message}`);
  }

  // Generate public URL
  const { data: urlData } = supabase.storage
    .from(UPLOAD_CONFIG.BUCKET_NAME)
    .getPublicUrl(data.path);

  return {
    path: data.path,
    url: urlData.publicUrl,
    originalName: file.originalname,
  };
}

/**
 * Upload multiple files (grouped by field name)
 * @param {Object} files - req.files dari multer (object keyed by field name)
 * @param {string} baseFolder - Base folder path (misal: sktm/3201xxxx_1700000)
 * @returns {Promise<Object>} - Object dengan key = fieldName, value = {url, originalName}
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
 * Upload Buffer PDF buatan backend ke Supabase Storage
 * @param {Buffer} pdfBuffer - Buffer PDF
 * @param {string} filePath - Target path di bucket
 * @returns {Promise<string>} - Public URL file PDF
 */
async function uploadPdfBuffer(pdfBuffer, filePath) {
  const { data, error } = await supabase.storage
    .from(UPLOAD_CONFIG.BUCKET_NAME)
    .upload(filePath, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (error) {
    console.error('❌ Gagal upload PDF ke storage:', error.message);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from(UPLOAD_CONFIG.BUCKET_NAME)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

module.exports = { uploadFile, uploadMultipleFiles, uploadPdfBuffer };
