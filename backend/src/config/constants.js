/**
 * Konstanta aplikasi untuk Sistem Pelaporan Web Kelurahan
 */

// Jam operasional kantor kelurahan (WIB / Asia/Jakarta)
const JAM_OPERASIONAL = {
  TIMEZONE: 'Asia/Jakarta',
  BUKA: 8,   // 08:00 WIB
  TUTUP: 15, // 15:00 WIB
  // Hari kerja: Senin(1) - Jumat(5)
  HARI_KERJA: [1, 2, 3, 4, 5],
};

// Pesan auto-reply WhatsApp berdasarkan jam operasional
const PESAN_BOT = {
  DALAM_JAM_OPERASIONAL:
    '✅ *Pengajuan Diterima (Jam Operasional)*\n\nTerima kasih. Berkas pengajuan surat Anda telah masuk ke sistem kami dan sedang diproses/diverifikasi oleh Petugas Kelurahan Mesjid Priyayi.\n\n📌 *Jam Pelayanan Kantor:* Senin – Jumat (08.00 – 15.00 WIB)\n\nAnda dapat memantau status surat Anda secara berkala melalui menu Tracking di website kami.',
  LUAR_JAM_OPERASIONAL:
    '⏳ *Pengajuan Diterima (Luar Jam Operasional)*\n\nTerima kasih. Berkas pengajuan surat Anda telah tersimpan di sistem kami.\n\n⚠️ *Catatan:* Saat ini kantor sedang di luar jam operasional. Pengajuan Anda akan diproses oleh petugas pada hari kerja berikutnya mulai pukul 08.00 WIB.\n\n📌 *Jam Pelayanan Kantor:* Senin – Jumat (08.00 – 15.00 WIB)\n\nAnda dapat memantau status surat Anda secara berkala melalui menu Tracking di website.',
};

// Jenis surat yang tersedia
const JENIS_SURAT = ['sktm', 'domisili', 'kematian'];

const LABEL_JENIS_SURAT = {
  sktm: 'Surat Keterangan Tidak Mampu (SKTM)',
  domisili: 'Surat Domisili',
  kematian: 'Surat Kematian',
};

// Status pengajuan
const STATUS_PENGAJUAN = ['pending', 'processed', 'completed', 'rejected'];

// Konfigurasi upload file
const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILES: 10,
  ALLOWED_MIMES: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  BUCKET_NAME: 'dokumen-pengajuan',
};

// Field dokumen wajib per jenis surat
const DOKUMEN_WAJIB = {
  sktm: ['surat_pengantar_rt_rw', 'ktp_pemohon', 'kartu_keluarga'],
  domisili: ['surat_pengantar_rt_rw', 'ktp_pemohon', 'kartu_keluarga'],
  kematian: [
    'surat_pengantar_rt_rw',
    'ktp_pemohon',
    'ktp_almarhum',
    'kk_almarhum',
    'surat_kematian_rs',
    'ktp_saksi_1',
    'ktp_saksi_2',
  ],
};

// Field dokumen opsional per jenis surat
const DOKUMEN_OPSIONAL = {
  sktm: [],
  domisili: [],
  kematian: ['akta_kelahiran_almarhum'],
};

module.exports = {
  JAM_OPERASIONAL,
  PESAN_BOT,
  JENIS_SURAT,
  LABEL_JENIS_SURAT,
  STATUS_PENGAJUAN,
  UPLOAD_CONFIG,
  DOKUMEN_WAJIB,
  DOKUMEN_OPSIONAL,
};
