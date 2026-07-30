const express = require('express');
const { requireAdmin } = require('../middleware/adminAuth');
const pengajuanController = require('../controllers/pengajuan.controller');

const router = express.Router();

router.use(requireAdmin);
router.get('/pengajuan', pengajuanController.listPengajuan);
router.get('/pengajuan/:id', pengajuanController.getPengajuanDetail);
router.patch('/pengajuan/:id/status', pengajuanController.updateStatusHandler);

module.exports = router;
