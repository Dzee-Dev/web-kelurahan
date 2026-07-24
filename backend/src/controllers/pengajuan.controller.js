const pengajuanService = require('../services/pengajuan.service');
const storageService = require('../services/storage.service');
const { buildWaMessage, buildWaDeepLink } = require('../utils/waMessageBuilder');
const { LABEL_JENIS_SURAT } = require('../config/constants');
const { AppError } = require('../middleware/errorHandler');

/**
 * POST /api/pengajuan
 * Submit pengajuan surat baru (warga-facing)
 */
async function submitPengajuan(req, res, next) {
  try {
    const {
      jenis_surat,
      nama_pemohon,
      nik_pemohon,
      no_hp,
      alamat_lengkap,
      data_pribadi,
      data_tambahan,
    } = req.body;

    // 1. Upload semua dokumen ke Supabase Storage
    const timestamp = Date.now();
    const folder = `${jenis_surat}/${nik_pemohon}_${timestamp}`;

    let dokumenUrls = {};
    if (req.files && Object.keys(req.files).length > 0) {
      dokumenUrls = await storageService.uploadMultipleFiles(req.files, folder);
    }

    // 2. Insert data ke database
    const pengajuan = await pengajuanService.createPengajuan({
      jenis_surat,
      nama_pemohon,
      nik_pemohon,
      no_hp,
      alamat_lengkap,
      data_pribadi,
      data_tambahan,
      dokumen_urls: dokumenUrls,
    });

    // 3. Generate pesan WA dan deep link
    const waMessage = buildWaMessage(pengajuan);
    const adminPhone = process.env.WABA_ADMIN_PHONE || '6281234567890';
    const waDeepLink = buildWaDeepLink(adminPhone, waMessage);

    // 4. Response
    res.status(201).json({
      success: true,
      message: `Pengajuan ${LABEL_JENIS_SURAT[jenis_surat]} berhasil disubmit`,
      data: {
        id: pengajuan.id,
        jenis_surat: pengajuan.jenis_surat,
        nama_pemohon: pengajuan.nama_pemohon,
        status: pengajuan.status,
        created_at: pengajuan.created_at,
        wa_deep_link: waDeepLink,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/pengajuan/:id
 * Cek status pengajuan berdasarkan ID (warga bisa cek status)
 */
async function getStatus(req, res, next) {
  try {
    const { id } = req.params;
    const pengajuan = await pengajuanService.getPengajuanById(id);

    res.json({
      success: true,
      data: {
        id: pengajuan.id,
        jenis_surat: pengajuan.jenis_surat,
        jenis_surat_label: LABEL_JENIS_SURAT[pengajuan.jenis_surat],
        nama_pemohon: pengajuan.nama_pemohon,
        status: pengajuan.status,
        created_at: pengajuan.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { submitPengajuan, getStatus };
