import { z } from 'zod';

// Validasi NIK (16 digit angka)
const nikSchema = z
  .string()
  .min(1, 'NIK wajib diisi')
  .regex(/^\d{16}$/, 'NIK harus 16 digit angka');

// Validasi No HP / WA Indonesia
const phoneSchema = z
  .string()
  .min(1, 'Nomor HP/WA wajib diisi')
  .regex(/^(08|\+?628)\d{8,12}$/, 'Format No. HP/WA tidak valid (contoh: 081234567890)');

// Schema Data Umum (Semua jenis surat)
export const dataUmumSchema = z.object({
  nama_pemohon: z.string().min(2, 'Nama lengkap minimal 2 karakter'),
  nik_pemohon: nikSchema,
  no_hp: phoneSchema,
  alamat_lengkap: z.string().min(5, 'Alamat lengkap wajib diisi'),
  tempat_lahir: z.string().min(2, 'Tempat lahir wajib diisi'),
  tanggal_lahir: z.string().min(1, 'Tanggal lahir wajib diisi'),
  jenis_kelamin: z.enum(['laki-laki', 'perempuan'], {
    errorMap: () => ({ message: 'Pilih jenis kelamin' }),
  }),
  agama: z.string().min(1, 'Pilih agama'),
  pekerjaan: z.string().min(2, 'Pekerjaan wajib diisi'),
});

// Schema Tambahan per Jenis Surat
export const sktmSchema = dataUmumSchema.extend({
  keperluan: z.string().min(5, 'Keperluan pembuatan SKTM wajib diisi'),
});

export const domisiliSchema = dataUmumSchema.extend({
  alamat_asal: z.string().min(5, 'Alamat asal sesuai KTP wajib diisi'),
  alamat_domisili: z.string().min(5, 'Alamat domisili saat ini wajib diisi'),
  keperluan: z.string().min(5, 'Keperluan pembuatan surat domisili wajib diisi'),
});

export const kematianSchema = dataUmumSchema.extend({
  nama_almarhum: z.string().min(2, 'Nama almarhum wajib diisi'),
  nik_almarhum: nikSchema,
  tanggal_kematian: z.string().min(1, 'Tanggal kematian wajib diisi'),
  tempat_meninggal: z.string().min(2, 'Tempat meninggal wajib diisi'),
  penyebab_kematian: z.string().min(2, 'Penyebab kematian wajib diisi'),
  hubungan_pemohon: z.string().min(2, 'Hubungan dengan almarhum wajib diisi'),
});

// Helper daftar dokumen yang wajib per jenis surat
export const DOKUMEN_REQUIREMENTS = {
  sktm: [
    { key: 'surat_pengantar_rt_rw', label: 'Surat Pengantar RT/RW', required: true },
    { key: 'ktp_pemohon', label: 'KTP Pemohon', required: true },
    { key: 'kartu_keluarga', label: 'Kartu Keluarga (KK)', required: true },
  ],
  domisili: [
    { key: 'surat_pengantar_rt_rw', label: 'Surat Pengantar RT/RW', required: true },
    { key: 'ktp_pemohon', label: 'KTP Pemohon', required: true },
    { key: 'kartu_keluarga', label: 'Kartu Keluarga (KK)', required: true },
  ],
  kematian: [
    { key: 'surat_pengantar_rt_rw', label: 'Surat Pengantar RT/RW', required: true },
    { key: 'ktp_pemohon', label: 'KTP Pemohon', required: true },
    { key: 'ktp_almarhum', label: 'KTP Almarhum/ah', required: true },
    { key: 'kk_almarhum', label: 'Kartu Keluarga Almarhum/ah', required: true },
    { key: 'surat_kematian_rs', label: 'Surat Kematian dari RS / Keterangan Dokter', required: true },
    { key: 'ktp_saksi_1', label: 'KTP Saksi 1', required: true },
    { key: 'ktp_saksi_2', label: 'KTP Saksi 2', required: true },
    { key: 'akta_kelahiran_almarhum', label: 'Akta Kelahiran Almarhum/ah (Opsional)', required: false },
  ],
};
