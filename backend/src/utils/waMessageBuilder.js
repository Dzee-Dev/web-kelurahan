const { LABEL_JENIS_SURAT } = require('../config/constants');

/**
 * Format data pengajuan menjadi pesan teks terstruktur untuk WhatsApp
 * @param {Object} data - Data pengajuan dari database
 * @returns {string} - Pesan teks terformat
 */
function buildWaMessage(data) {
  const lines = [];

  lines.push('📋 *PENGAJUAN SURAT KELURAHAN ONLINE*');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  // Jenis Surat & ID
  lines.push(`📄 *Jenis Surat:* ${LABEL_JENIS_SURAT[data.jenis_surat] || data.jenis_surat}`);
  lines.push(`🔑 *Kode Tracking ID:* ${data.id}`);
  lines.push('');

  // Data Pemohon
  lines.push('👤 *DATA PEMOHON*');
  lines.push(`• Nama: ${data.nama_pemohon}`);
  lines.push(`• NIK: ${data.nik_pemohon}`);
  lines.push(`• No. HP: ${data.no_hp}`);
  lines.push(`• Alamat: ${data.alamat_lengkap}`);

  // Data Pribadi
  if (data.data_pribadi) {
    const dp = data.data_pribadi;
    if (dp.tempat_lahir) lines.push(`• TTL: ${dp.tempat_lahir}, ${dp.tanggal_lahir || '-'}`);
    if (dp.jenis_kelamin) lines.push(`• Kelamin: ${dp.jenis_kelamin}`);
    if (dp.agama) lines.push(`• Agama: ${dp.agama}`);
    if (dp.pekerjaan) lines.push(`• Pekerjaan: ${dp.pekerjaan}`);
  }
  lines.push('');

  // Data Tambahan per Jenis Surat
  if (data.data_tambahan) {
    const dt = data.data_tambahan;
    lines.push('📝 *DETAIL KEPERLUAN*');

    switch (data.jenis_surat) {
      case 'sktm':
        if (dt.keperluan) lines.push(`• Keperluan: ${dt.keperluan}`);
        break;

      case 'domisili':
        if (dt.alamat_asal) lines.push(`• Alamat Asal (KTP): ${dt.alamat_asal}`);
        if (dt.alamat_domisili) lines.push(`• Alamat Domisili: ${dt.alamat_domisili}`);
        if (dt.keperluan) lines.push(`• Keperluan: ${dt.keperluan}`);
        break;

      case 'kematian':
        if (dt.nama_almarhum) lines.push(`• Nama Almarhum: ${dt.nama_almarhum}`);
        if (dt.nik_almarhum) lines.push(`• NIK Almarhum: ${dt.nik_almarhum}`);
        if (dt.tanggal_kematian) lines.push(`• Tgl Kematian: ${dt.tanggal_kematian}`);
        if (dt.tempat_meninggal) lines.push(`• Tempat Meninggal: ${dt.tempat_meninggal}`);
        if (dt.penyebab_kematian) lines.push(`• Penyebab: ${dt.penyebab_kematian}`);
        if (dt.hubungan_pemohon) lines.push(`• Hubungan: ${dt.hubungan_pemohon}`);
        break;
    }
    lines.push('');
  }

  // Link Dokumen PDF & Attachments
  if (data.dokumen_urls && typeof data.dokumen_urls === 'object') {
    lines.push('📎 *DOKUMEN & BUKTI PDF*');
    
    if (data.dokumen_urls.pdf_bukti_pengajuan) {
      const pdfUrl = typeof data.dokumen_urls.pdf_bukti_pengajuan === 'string'
        ? data.dokumen_urls.pdf_bukti_pengajuan
        : data.dokumen_urls.pdf_bukti_pengajuan.url;
      lines.push(`📑 *PDF Bukti Pengajuan:* ${pdfUrl}`);
    }

    const entries = Object.entries(data.dokumen_urls);
    for (const [fieldName, fileData] of entries) {
      if (fieldName === 'pdf_bukti_pengajuan') continue;
      const label = fieldName.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const url = typeof fileData === 'string' ? fileData : fileData.url;
      lines.push(`• Foto ${label}: ${url}`);
    }
    lines.push('');
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push(`🕐 Diajukan: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB`);

  return lines.join('\n');
}

/**
 * Generate deep link wa.me untuk redirect warga ke WhatsApp admin
 * @param {string} phoneNumber - Nomor WA admin (tanpa +, contoh: 6281234567890)
 * @param {string} message - Pesan teks
 * @returns {string} - URL wa.me
 */
function buildWaDeepLink(phoneNumber, message) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

module.exports = { buildWaMessage, buildWaDeepLink };
