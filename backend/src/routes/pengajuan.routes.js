const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { validatePengajuan } = require('../middleware/validation');
const pengajuanController = require('../controllers/pengajuan.controller');
const { DOKUMEN_WAJIB, DOKUMEN_OPSIONAL } = require('../config/constants');

/**
 * Build upload fields dynamically from constants
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

// POST /api/pengajuan — Submit pengajuan (warga)
router.post('/', uploadFields, validatePengajuan, pengajuanController.submitPengajuan);

// GET /api/pengajuan — List all pengajuan (admin)
router.get('/', pengajuanController.listPengajuan);

// GET /api/pengajuan/:id — Get status (warga tracking)
router.get('/:id', pengajuanController.getStatus);

// PATCH /api/pengajuan/:id/status — Update status (admin)
router.patch('/:id/status', pengajuanController.updateStatusHandler);

module.exports = router;
