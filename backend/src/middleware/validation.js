const { JENIS_SURAT, DOKUMEN_WAJIB } = require('../config/constants');
const { AppError } = require('./errorHandler');

/**
 * Validasi field data umum yang wajib diisi pada semua form
 */
function validateDataUmum(body) {
  const errors = [];
  const requiredFields = [
    { key: 'nama_pemohon', label: 'Nama Lengkap' },
    { key: 'nik_pemohon', label: 'NIK' },
    { key: 'no_hp', label: 'No. HP / WhatsApp' },
    { key: 'alamat_lengkap', label: 'Alamat Lengkap' },
    { key: 'jenis_surat', label: 'Jenis Surat' },
  ];

  for (const field of requiredFields) {
    if (!body[field.key] || String(body[field.key]).trim() === '') {
      errors.push(`${field.label} wajib diisi`);
    }
  }

  // Validasi NIK: harus 16 digit angka
  if (body.nik_pemohon && !/^\d{16}$/.test(body.nik_pemohon)) {
    errors.push('NIK harus terdiri dari 16 digit angka');
  }

  // Validasi jenis surat
  if (body.jenis_surat && !JENIS_SURAT.includes(body.jenis_surat)) {
    errors.push(`Jenis surat tidak valid. Pilihan: ${JENIS_SURAT.join(', ')}`);
  }

  // Validasi No. HP (format Indonesia)
  if (body.no_hp && !/^(08|\+?628)\d{8,12}$/.test(body.no_hp.replace(/[\s-]/g, ''))) {
    errors.push('Format No. HP tidak valid');
  }

  return errors;
}

/**
 * Validasi data_pribadi (JSONB field)
 */
function validateDataPribadi(dataPribadi) {
  const errors = [];

  if (!dataPribadi || typeof dataPribadi !== 'object') {
    errors.push('Data pribadi wajib diisi');
    return errors;
  }

  const requiredFields = [
    { key: 'tempat_lahir', label: 'Tempat Lahir' },
    { key: 'tanggal_lahir', label: 'Tanggal Lahir' },
    { key: 'jenis_kelamin', label: 'Jenis Kelamin' },
    { key: 'agama', label: 'Agama' },
    { key: 'pekerjaan', label: 'Pekerjaan' },
  ];

  for (const field of requiredFields) {
    if (!dataPribadi[field.key] || String(dataPribadi[field.key]).trim() === '') {
      errors.push(`${field.label} wajib diisi`);
    }
  }

  // Validasi jenis kelamin
  if (dataPribadi.jenis_kelamin && !['laki-laki', 'perempuan'].includes(dataPribadi.jenis_kelamin.toLowerCase())) {
    errors.push('Jenis kelamin harus "Laki-laki" atau "Perempuan"');
  }

  return errors;
}

/**
 * Validasi data_tambahan sesuai jenis surat
 */
function validateDataTambahan(jenisSurat, dataTambahan) {
  const errors = [];

  if (!dataTambahan || typeof dataTambahan !== 'object') {
    errors.push('Data tambahan wajib diisi');
    return errors;
  }

  switch (jenisSurat) {
    case 'sktm':
      if (!dataTambahan.keperluan || String(dataTambahan.keperluan).trim() === '') {
        errors.push('Keperluan pembuatan SKTM wajib diisi');
      }
      break;

    case 'domisili':
      if (!dataTambahan.alamat_asal || String(dataTambahan.alamat_asal).trim() === '') {
        errors.push('Alamat asal (sesuai KTP) wajib diisi');
      }
      if (!dataTambahan.alamat_domisili || String(dataTambahan.alamat_domisili).trim() === '') {
        errors.push('Alamat domisili saat ini wajib diisi');
      }
      if (!dataTambahan.keperluan || String(dataTambahan.keperluan).trim() === '') {
        errors.push('Keperluan pembuatan surat domisili wajib diisi');
      }
      break;

    case 'kematian':
      const requiredKematian = [
        { key: 'nama_almarhum', label: 'Nama lengkap almarhum/almarhumah' },
        { key: 'nik_almarhum', label: 'NIK almarhum/almarhumah' },
        { key: 'tanggal_kematian', label: 'Tanggal kematian' },
        { key: 'tempat_meninggal', label: 'Tempat meninggal' },
        { key: 'penyebab_kematian', label: 'Penyebab kematian' },
        { key: 'hubungan_pemohon', label: 'Hubungan pemohon dengan almarhum' },
      ];
      for (const field of requiredKematian) {
        if (!dataTambahan[field.key] || String(dataTambahan[field.key]).trim() === '') {
          errors.push(`${field.label} wajib diisi`);
        }
      }
      // Validasi NIK almarhum
      if (dataTambahan.nik_almarhum && !/^\d{16}$/.test(dataTambahan.nik_almarhum)) {
        errors.push('NIK almarhum harus terdiri dari 16 digit angka');
      }
      break;
  }

  return errors;
}

/**
 * Validasi dokumen yang di-upload
 */
function validateDokumen(jenisSurat, files) {
  const errors = [];
  const wajib = DOKUMEN_WAJIB[jenisSurat] || [];

  if (!files || Object.keys(files).length === 0) {
    errors.push('Minimal satu dokumen harus di-upload');
    return errors;
  }

  for (const fieldName of wajib) {
    if (!files[fieldName] || files[fieldName].length === 0) {
      const label = fieldName.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      errors.push(`Dokumen "${label}" wajib di-upload`);
    }
  }

  return errors;
}

/**
 * Express middleware: validasi request pengajuan surat
 */
function validatePengajuan(req, res, next) {
  // Parse data_pribadi dan data_tambahan jika dikirim sebagai string (dari multipart form)
  if (typeof req.body.data_pribadi === 'string') {
    try {
      req.body.data_pribadi = JSON.parse(req.body.data_pribadi);
    } catch {
      throw new AppError('Format data_pribadi tidak valid (harus JSON)', 400);
    }
  }
  if (typeof req.body.data_tambahan === 'string') {
    try {
      req.body.data_tambahan = JSON.parse(req.body.data_tambahan);
    } catch {
      throw new AppError('Format data_tambahan tidak valid (harus JSON)', 400);
    }
  }

  const allErrors = [
    ...validateDataUmum(req.body),
    ...validateDataPribadi(req.body.data_pribadi),
    ...validateDataTambahan(req.body.jenis_surat, req.body.data_tambahan),
    ...validateDokumen(req.body.jenis_surat, req.files),
  ];

  if (allErrors.length > 0) {
    throw new AppError('Validasi gagal', 400, allErrors);
  }

  next();
}

module.exports = { validatePengajuan, validateDataUmum, validateDataPribadi, validateDataTambahan, validateDokumen };
