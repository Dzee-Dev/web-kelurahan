const db = require('../config/database');
const { AppError } = require('../middleware/errorHandler');

/**
 * Insert pengajuan surat baru ke database
 */
async function createPengajuan(data) {
  const query = `
    INSERT INTO pengajuan_surat 
      (jenis_surat, nama_pemohon, nik_pemohon, no_hp, alamat_lengkap, data_pribadi, data_tambahan, dokumen_urls, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
    RETURNING *
  `;
  const values = [
    data.jenis_surat,
    data.nama_pemohon,
    data.nik_pemohon,
    data.no_hp,
    data.alamat_lengkap,
    JSON.stringify(data.data_pribadi || {}),
    JSON.stringify(data.data_tambahan || {}),
    JSON.stringify(data.dokumen_urls || {}),
  ];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    throw new AppError(`Gagal menyimpan pengajuan: ${err.message}`, 500);
  }
}

/**
 * Ambil semua pengajuan dengan filter opsional
 */
async function getAllPengajuan(filters = {}) {
  const { status, jenis_surat, page = 1, limit = 20 } = filters;
  const offset = (page - 1) * limit;

  let conditions = [];
  let values = [];
  let paramIdx = 1;

  if (status) {
    conditions.push(`status = $${paramIdx++}`);
    values.push(status);
  }
  if (jenis_surat) {
    conditions.push(`jenis_surat = $${paramIdx++}`);
    values.push(jenis_surat);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  try {
    // Count total
    const countQuery = `SELECT COUNT(*) as total FROM pengajuan_surat ${whereClause}`;
    const { rows: countRows } = await db.query(countQuery, values);
    const total = parseInt(countRows[0].total, 10);

    // Fetch data
    const dataQuery = `
      SELECT * FROM pengajuan_surat 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT $${paramIdx++} OFFSET $${paramIdx}
    `;
    const { rows } = await db.query(dataQuery, [...values, limit, offset]);

    return {
      data: rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (err) {
    throw new AppError(`Gagal mengambil data pengajuan: ${err.message}`, 500);
  }
}

/**
 * Ambil detail pengajuan berdasarkan ID
 */
async function getPengajuanById(id) {
  try {
    const { rows } = await db.query('SELECT * FROM pengajuan_surat WHERE id = $1', [id]);
    if (rows.length === 0) {
      throw new AppError('Pengajuan tidak ditemukan', 404);
    }
    return rows[0];
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(`Gagal mengambil data pengajuan: ${err.message}`, 500);
  }
}

/**
 * Update status pengajuan
 */
async function updateStatus(id, status) {
  try {
    const { rows } = await db.query(
      'UPDATE pengajuan_surat SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (rows.length === 0) {
      throw new AppError('Pengajuan tidak ditemukan', 404);
    }
    return rows[0];
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(`Gagal update status: ${err.message}`, 500);
  }
}

/**
 * Update dokumen_urls di database
 */
async function updateDokumenUrls(id, dokumenUrls) {
  try {
    const { rows } = await db.query(
      'UPDATE pengajuan_surat SET dokumen_urls = $1 WHERE id = $2 RETURNING *',
      [JSON.stringify(dokumenUrls), id]
    );
    return rows[0];
  } catch (err) {
    throw new AppError(`Gagal update dokumen URLs: ${err.message}`, 500);
  }
}

module.exports = { createPengajuan, getAllPengajuan, getPengajuanById, updateStatus, updateDokumenUrls };
