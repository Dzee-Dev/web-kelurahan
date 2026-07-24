const supabase = require('../config/supabase');
const { AppError } = require('../middleware/errorHandler');

/**
 * Insert pengajuan surat baru ke database
 * @param {Object} data - Data pengajuan
 * @returns {Promise<Object>} - Data yang di-insert
 */
async function createPengajuan(data) {
  const { data: result, error } = await supabase
    .from('pengajuan_surat')
    .insert({
      jenis_surat: data.jenis_surat,
      nama_pemohon: data.nama_pemohon,
      nik_pemohon: data.nik_pemohon,
      no_hp: data.no_hp,
      alamat_lengkap: data.alamat_lengkap,
      data_pribadi: data.data_pribadi,
      data_tambahan: data.data_tambahan,
      dokumen_urls: data.dokumen_urls,
      status: 'pending',
    })
    .select()
    .single();

  if (error) {
    throw new AppError(`Gagal menyimpan pengajuan: ${error.message}`, 500);
  }

  return result;
}

/**
 * Ambil semua pengajuan dengan filter opsional
 * @param {Object} filters - { status, jenis_surat, page, limit }
 * @returns {Promise<Object>} - { data, count }
 */
async function getAllPengajuan(filters = {}) {
  const { status, jenis_surat, page = 1, limit = 20 } = filters;
  const offset = (page - 1) * limit;

  let query = supabase
    .from('pengajuan_surat')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) {
    query = query.eq('status', status);
  }
  if (jenis_surat) {
    query = query.eq('jenis_surat', jenis_surat);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new AppError(`Gagal mengambil data pengajuan: ${error.message}`, 500);
  }

  return {
    data,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  };
}

/**
 * Ambil detail pengajuan berdasarkan ID
 * @param {string} id - UUID pengajuan
 * @returns {Promise<Object>}
 */
async function getPengajuanById(id) {
  const { data, error } = await supabase
    .from('pengajuan_surat')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      throw new AppError('Pengajuan tidak ditemukan', 404);
    }
    throw new AppError(`Gagal mengambil data pengajuan: ${error.message}`, 500);
  }

  return data;
}

/**
 * Update status pengajuan
 * @param {string} id - UUID pengajuan
 * @param {string} status - Status baru
 * @returns {Promise<Object>}
 */
async function updateStatus(id, status) {
  const { data, error } = await supabase
    .from('pengajuan_surat')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      throw new AppError('Pengajuan tidak ditemukan', 404);
    }
    throw new AppError(`Gagal update status: ${error.message}`, 500);
  }

  return data;
}

module.exports = { createPengajuan, getAllPengajuan, getPengajuanById, updateStatus };
