const pengajuanService = require('../services/pengajuan.service');
const storageService = require('../services/storage.service');
const documentAccess = require('../services/documentAccess.service');
const { generatePengajuanPdf } = require('../services/pdf.service');
const { sendMessage, sendMediaFile } = require('../services/waBot');
const { buildWaMessage } = require('../utils/waMessageBuilder');
const { LABEL_JENIS_SURAT } = require('../config/constants');
const { AppError } = require('../middleware/errorHandler');

async function sendAdminNotificationPackage(adminPhone, waMessage, pengajuan) {
  await sendMessage(adminPhone, waMessage);

  const entries = Object.entries(pengajuan.dokumen_urls || {});
  let sentCount = 0;
  for (const [field, fileData] of entries) {
    try {
      const filePath = await documentAccess.resolveStoredDocument(fileData);
      const label = field.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
      const filename = documentAccess.sanitizeDownloadName(fileData.originalName, field);
      const result = await sendMediaFile(adminPhone, filePath, {
        filename,
        caption: `Dokumen: ${label}\nKode Tracking: ${pengajuan.id}`,
      });
      if (result) sentCount += 1;
    } catch (error) {
      console.error(`⚠️ Gagal menyiapkan attachment "${field}":`, error.message);
    }
  }

  console.log(`📎 ${sentCount}/${entries.length} attachment pengajuan ${pengajuan.id} berhasil dikirim`);
}
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

    // 1. Upload semua dokumen ke local storage
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

    // 3. Generate PDF Bukti Tanda Terima
    let pdfUrl = null;
    try {
      const pdfBuffer = await generatePengajuanPdf(pengajuan);
      const pdfPath = `${jenis_surat}/bukti_pengajuan_${pengajuan.id}.pdf`;
      const pdfFile = await storageService.uploadPdfBuffer(pdfBuffer, pdfPath);

      if (pdfFile) {
        dokumenUrls.pdf_bukti_pengajuan = {
          ...pdfFile,
          originalName: `Bukti_Pengajuan_${jenis_surat.toUpperCase()}_${nik_pemohon}.pdf`,
        };
        await pengajuanService.updateDokumenUrls(pengajuan.id, dokumenUrls);
        pdfUrl = documentAccess.buildReceiptUrl(pengajuan.id);
      }
    } catch (pdfErr) {
      console.error('\u26a0\ufe0f Gagal membuat PDF:', pdfErr.message);
    }

    pengajuan.dokumen_urls = dokumenUrls;

    // 5. Kirim Recap Lengkap via Bot WA secara background
    let adminPhone = process.env.WA_ADMIN_PHONE || '6285287434646';
    adminPhone = adminPhone.replace(/[^0-9]/g, '');
    if (adminPhone.startsWith('0')) adminPhone = '62' + adminPhone.slice(1);
    
    const waMessage = buildWaMessage(pengajuan);
    
    // Bot mengirim rekap lalu seluruh dokumen privat langsung ke admin.
    sendAdminNotificationPackage(adminPhone, waMessage, pengajuan).catch((error) => {
      console.error('Gagal mengirim paket notifikasi admin:', error.message);
    });

    // 6. Build WA deep link (pesan lengkap dengan seluruh tautan download PDF & foto dokumen)
    const waDeepLink = `https://wa.me/${adminPhone}?text=${encodeURIComponent(waMessage)}`;

    // 6. Response
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
 * Cek status pengajuan (warga tracking)
 */
async function getStatus(req, res, next) {
  try {
    const { id } = req.params;
    const pengajuan = await pengajuanService.getPengajuanById(id);

    const pdfUrl = pengajuan.dokumen_urls?.pdf_bukti_pengajuan
      ? documentAccess.buildReceiptUrl(pengajuan.id)
      : null;

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
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/pengajuan
 * List semua pengajuan (admin)
 */
/**
 * GET /api/admin/pengajuan/:id
 * Detail lengkap pengajuan untuk admin terautentikasi.
 */
async function getPengajuanDetail(req, res, next) {
  try {
    const pengajuan = await pengajuanService.getPengajuanById(req.params.id);
    const dokumenManifest = Object.fromEntries(
      Object.entries(pengajuan.dokumen_urls || {}).map(([field, fileData]) => [
        field,
        {
          originalName: typeof fileData === 'object' ? fileData.originalName || field : field,
          mimeType: typeof fileData === 'object' ? fileData.mimeType || null : null,
        },
      ])
    );

    res.json({
      success: true,
      data: { ...pengajuan, dokumen_urls: dokumenManifest },
    });
  } catch (error) {
    next(error);
  }
}

async function downloadAdminDocument(req, res, next) {
  try {
    const pengajuan = await pengajuanService.getPengajuanById(req.params.id);
    const fileData = pengajuan.dokumen_urls?.[req.params.field];
    if (!fileData) throw new AppError('Dokumen tidak ditemukan pada pengajuan ini', 404);

    const filePath = await documentAccess.resolveStoredDocument(fileData);
    const fileName = documentAccess.sanitizeDownloadName(fileData.originalName, req.params.field);
    res.set('Cache-Control', 'private, no-store, max-age=0');
    return res.download(filePath, fileName, (error) => {
      if (error && !res.headersSent) next(error);
    });
  } catch (error) {
    next(error);
  }
}

async function downloadReceipt(req, res, next) {
  try {
    if (!documentAccess.verifyReceiptAccess(req.params.id, req.query.expires, req.query.token)) {
      throw new AppError('Tautan bukti tidak valid atau sudah kedaluwarsa', 403);
    }

    const pengajuan = await pengajuanService.getPengajuanById(req.params.id);
    const fileData = pengajuan.dokumen_urls?.pdf_bukti_pengajuan;
    if (!fileData) throw new AppError('Bukti pengajuan tidak ditemukan', 404);

    const filePath = await documentAccess.resolveStoredDocument(fileData);
    const fileName = documentAccess.sanitizeDownloadName(fileData.originalName, `Bukti_Pengajuan_${req.params.id}.pdf`);
    res.set('Cache-Control', 'private, no-store, max-age=0');
    return res.download(filePath, fileName, (error) => {
      if (error && !res.headersSent) next(error);
    });
  } catch (error) {
    next(error);
  }
}

async function listPengajuan(req, res, next) {
  try {
    const { status, jenis_surat, page, limit } = req.query;
    const result = await pengajuanService.getAllPengajuan({ status, jenis_surat, page, limit });
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/pengajuan/:id/status
 * Update status pengajuan (admin)
 */
async function updateStatusHandler(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processed', 'completed', 'rejected'];
    if (!status || !validStatuses.includes(status)) {
      throw new AppError(`Status tidak valid. Pilihan: ${validStatuses.join(', ')}`, 400);
    }

    const updated = await pengajuanService.updateStatus(id, status);

    // Notifikasi ke warga via WA Bot
    try {
      const statusLabels = {
        pending: 'Menunggu Verifikasi',
        processed: 'Sedang Diproses',
        completed: 'Selesai \u2014 Silakan ambil surat di kantor kelurahan',
        rejected: 'Ditolak \u2014 Silakan hubungi admin kelurahan',
      };
      const noHp = updated.no_hp.replace(/^0/, '62').replace(/[^0-9]/g, '');
      const msg = `*Kelurahan Mesjid Priyayi*\n\nYth. ${updated.nama_pemohon},\nStatus pengajuan surat Anda telah diperbarui:\n\n*Status:* ${statusLabels[status]}\n*Kode Tracking:* ${updated.id}\n\nTerima kasih.`;
      await sendMessage(noHp, msg);
    } catch (waErr) {
      console.error('\u26a0\ufe0f Gagal kirim notifikasi status ke warga:', waErr.message);
    }

    res.json({
      success: true,
      message: `Status pengajuan berhasil diubah menjadi "${status}"`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  submitPengajuan,
  getStatus,
  getPengajuanDetail,
  downloadAdminDocument,
  downloadReceipt,
  listPengajuan,
  updateStatusHandler,
};
