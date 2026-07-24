const pengajuanService = require('../services/pengajuan.service');
const storageService = require('../services/storage.service');
const { generatePengajuanPdf } = require('../services/pdf.service');
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

    // 1. Upload semua dokumen foto/pdf yang di-attach warga ke Supabase Storage
    const timestamp = Date.now();
    const folder = `${jenis_surat}/${nik_pemohon}_${timestamp}`;

    let dokumenUrls = {};
    if (req.files && Object.keys(req.files).length > 0) {
      dokumenUrls = await storageService.uploadMultipleFiles(req.files, folder);
    }

    // 2. Insert data awal ke database
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

    // 3. Generate PDF Bukti Tanda Terima Resmi
    let pdfUrl = null;
    try {
      const pdfBuffer = await generatePengajuanPdf(pengajuan);
      const pdfPath = `${jenis_surat}/bukti_pengajuan_${pengajuan.id}.pdf`;
      pdfUrl = await storageService.uploadPdfBuffer(pdfBuffer, pdfPath);

      if (pdfUrl) {
        // Simpan PDF URL ke dokumen_urls
        dokumenUrls.pdf_bukti_pengajuan = {
          url: pdfUrl,
          originalName: `Bukti_Pengajuan_${jenis_surat.toUpperCase()}_${nik_pemohon}.pdf`,
        };
        // Update di DB
        await pengajuanService.updateStatus(pengajuan.id, pengajuan.status);
      }
    } catch (pdfErr) {
      console.error('⚠️ Gagal membuat PDF bukti pengajuan:', pdfErr.message);
    }

    pengajuan.dokumen_urls = dokumenUrls;

    // 4. Generate pesan WA dan deep link (termasuk link PDF)
    const waMessage = buildWaMessage(pengajuan);
    const adminPhone = process.env.WABA_ADMIN_PHONE || '6281234567890';
    const waDeepLink = buildWaDeepLink(adminPhone, waMessage);

    // 5. Response
    res.status(201).json({
      success: true,
      message: `Pengajuan ${LABEL_JENIS_SURAT[jenis_surat]} berhasil disubmit`,
      data: {
        id: pengajuan.id,
        jenis_surat: pengajuan.jenis_surat,
        nama_pemohon: pengajuan.nama_pemohon,
        status: pengajuan.status,
        created_at: pengajuan.created_at,
        pdf_url: pdfUrl,
        wa_deep_link: waDeepLink,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/pengajuan/:id
 * Cek status pengajuan berdasarkan ID (warga bisa cek status & download PDF)
 */
async function getStatus(req, res, next) {
  try {
    const { id } = req.params;
    const pengajuan = await pengajuanService.getPengajuanById(id);

    const pdfUrl = pengajuan.dokumen_urls?.pdf_bukti_pengajuan?.url || null;

    res.json({
      success: true,
      data: {
        id: pengajuan.id,
        jenis_surat: pengajuan.jenis_surat,
        jenis_surat_label: LABEL_JENIS_SURAT[pengajuan.jenis_surat],
        nama_pemohon: pengajuan.nama_pemohon,
        status: pengajuan.status,
        created_at: pengajuan.created_at,
        pdf_url: pdfUrl,
        dokumen_urls: pengajuan.dokumen_urls,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { submitPengajuan, getStatus };
