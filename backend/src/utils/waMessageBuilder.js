const { LABEL_JENIS_SURAT } = require('../config/constants');

function buildWaMessage(data) {
  const lines = [];

  lines.push('*[ PENGAJUAN SURAT KELURAHAN ONLINE ]*');
  lines.push('─────────────────────────────');
  lines.push('');

  lines.push(`*Jenis Surat:* ${LABEL_JENIS_SURAT[data.jenis_surat] || data.jenis_surat}`);
  lines.push(`*Tracking ID:* ${data.id}`);
  lines.push('');

  lines.push('*-- DATA PEMOHON --*');
  lines.push(`*Nama:* ${data.nama_pemohon}`);
  lines.push(`*NIK:* ${data.nik_pemohon}`);
  lines.push(`*No. HP:* ${data.no_hp}`);
  lines.push(`*Alamat:* ${data.alamat_lengkap}`);

  if (data.data_pribadi) {
    const dp = data.data_pribadi;
    if (dp.tempat_lahir) lines.push(`*TTL:* ${dp.tempat_lahir}, ${dp.tanggal_lahir || '-'}`);
    if (dp.jenis_kelamin) lines.push(`*Kelamin:* ${dp.jenis_kelamin}`);
    if (dp.agama) lines.push(`*Agama:* ${dp.agama}`);
    if (dp.pekerjaan) lines.push(`*Pekerjaan:* ${dp.pekerjaan}`);
  }
  lines.push('');

  if (data.data_tambahan) {
    const dt = data.data_tambahan;
    lines.push('*-- DETAIL KEPERLUAN --*');

    switch (data.jenis_surat) {
      case 'sktm':
        if (dt.keperluan) lines.push(`*Keperluan:* ${dt.keperluan}`);
        break;
      case 'domisili':
        if (dt.alamat_asal) lines.push(`*Alamat Asal:* ${dt.alamat_asal}`);
        if (dt.alamat_domisili) lines.push(`*Alamat Domisili:* ${dt.alamat_domisili}`);
        if (dt.keperluan) lines.push(`*Keperluan:* ${dt.keperluan}`);
        break;
      case 'kematian':
        if (dt.nama_almarhum) lines.push(`*Nama Almarhum:* ${dt.nama_almarhum}`);
        if (dt.nik_almarhum) lines.push(`*NIK Almarhum:* ${dt.nik_almarhum}`);
        if (dt.tanggal_kematian) lines.push(`*Tgl Kematian:* ${dt.tanggal_kematian}`);
        if (dt.tempat_meninggal) lines.push(`*Tempat Meninggal:* ${dt.tempat_meninggal}`);
        if (dt.penyebab_kematian) lines.push(`*Penyebab:* ${dt.penyebab_kematian}`);
        if (dt.hubungan_pemohon) lines.push(`*Hubungan:* ${dt.hubungan_pemohon}`);
        break;
    }
    lines.push('');
  }

  if (data.dokumen_urls && typeof data.dokumen_urls === 'object') {
    const documentCount = Object.keys(data.dokumen_urls).length;
    const frontendUrl = (process.env.FRONTEND_URL || 'https://web-kelurahan-blush.vercel.app').replace(/\/$/, '');
    lines.push('*-- DOKUMEN & BUKTI --*');
    lines.push(`*${documentCount} dokumen* tersimpan secara privat.`);
    lines.push('Petugas dapat membuka dan mengunduhnya setelah login melalui:');
    lines.push(`${frontendUrl}/admin/dashboard/${data.id}`);
    lines.push('');
  }

  lines.push('─────────────────────────────');
  lines.push(`_Waktu Submit: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB_`);

  return lines.join('\n');
}

function buildWaDeepLink(phoneNumber, message) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

module.exports = { buildWaMessage, buildWaDeepLink };
