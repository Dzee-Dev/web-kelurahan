const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { validatePengajuan } = require('../middleware/validation');
const pengajuanController = require('../controllers/pengajuan.controller');
const { DOKUMEN_WAJIB, DOKUMEN_OPSIONAL } = require('../config/constants');

/**
 * Bangun array field upload secara dinamis berdasarkan semua
 * jenis surat yang ada di constants. Setiap field max 1 file.
 */
function buildUploadFields() {
  const fieldSet = new Set();

  for (const fields of Object.values(DOKUMEN_WAJIB)) {
    fields.forEach((f) => fieldSet.add(f));
  }
  for (const fields of Object.values(DOKUMEN_OPSIONAL)) {
    fields.forEach((f) => fieldSet.add(f));
  }

  return Array.from(fieldSet).map((name) => ({ name, maxCount: 1 }));
}

const uploadFields = upload.fields(buildUploadFields());

/**
 * POST /api/pengajuan
 * Submit pengajuan surat baru
 * - Multipart form: teks fields + file uploads
 */
router.post('/', uploadFields, validatePengajuan, pengajuanController.submitPengajuan);

/**
 * GET /api/pengajuan/:id
 * Cek status pengajuan (warga tracking)
 */
router.get('/:id', pengajuanController.getStatus);

/**
 * PATCH /api/pengajuan/:id/status
 * Update status pengajuan (admin)
 */
router.patch('/:id/status', pengajuanController.updateStatusHandler);

module.exports = router;
