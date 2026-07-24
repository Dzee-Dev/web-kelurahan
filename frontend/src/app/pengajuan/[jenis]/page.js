'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  sktmSchema,
  domisiliSchema,
  kematianSchema,
  DOKUMEN_REQUIREMENTS,
} from '@/lib/schemas';
import { submitPengajuan } from '@/lib/api';
import DocumentUploader from '@/components/DocumentUploader';
import SuccessModal from '@/components/SuccessModal';
import {
  FileText,
  Home,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Building2,
} from 'lucide-react';

const CATEGORY_MAP = {
  sktm: {
    title: 'Surat Keterangan Tidak Mampu (SKTM)',
    desc: 'Pengajuan surat untuk beasiswa, bantuan sosial, atau keringanan pengobatan.',
    schema: sktmSchema,
    icon: FileText,
  },
  domisili: {
    title: 'Surat Keterangan Domisili',
    desc: 'Pengajuan surat domisili tempat tinggal sementara warga.',
    schema: domisiliSchema,
    icon: Home,
  },
  kematian: {
    title: 'Surat Keterangan Kematian',
    desc: 'Pengajuan pelaporan kematian warga kelurahan.',
    schema: kematianSchema,
    icon: UserCheck,
  },
};

export default function FormPengajuanPage() {
  const params = useParams();
  const router = useRouter();
  const jenisSurat = params.jenis;

  const category = CATEGORY_MAP[jenisSurat];

  const [step, setStep] = useState(1);
  const [documentFiles, setDocumentFiles] = useState({});
  const [documentErrors, setDocumentErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: category ? zodResolver(category.schema) : undefined,
    mode: 'onTouched',
    defaultValues: {
      jenis_surat: jenisSurat,
      jenis_kelamin: 'laki-laki',
      agama: 'Islam',
    },
  });

  if (!category) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 glass-panel rounded-3xl text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Jenis Surat Tidak Ditemukan</h2>
        <button onClick={() => router.push('/')} className="gradient-btn px-6 py-2.5 rounded-xl text-white text-sm font-semibold">
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const requirements = DOKUMEN_REQUIREMENTS[jenisSurat] || [];

  const handleDocumentChange = (fieldName, file) => {
    setDocumentFiles((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
    setDocumentErrors((prev) => ({
      ...prev,
      [fieldName]: null,
    }));
  };

  const validateDocuments = () => {
    const errs = {};
    let valid = true;

    for (const req of requirements) {
      if (req.required && !documentFiles[req.key]) {
        errs[req.key] = `Dokumen ${req.label} wajib di-upload`;
        valid = false;
      }
    }

    setDocumentErrors(errs);
    return valid;
  };

  const nextStep = async () => {
    setApiError(null);
    let fieldsToValidate = [];

    if (step === 1) {
      fieldsToValidate = [
        'nama_pemohon',
        'nik_pemohon',
        'no_hp',
        'alamat_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'agama',
        'pekerjaan',
      ];
    } else if (step === 2) {
      if (jenisSurat === 'sktm') {
        fieldsToValidate = ['keperluan'];
      } else if (jenisSurat === 'domisili') {
        fieldsToValidate = ['alamat_asal', 'alamat_domisili', 'keperluan'];
      } else if (jenisSurat === 'kematian') {
        fieldsToValidate = [
          'nama_almarhum',
          'nik_almarhum',
          'tanggal_kematian',
          'tempat_meninggal',
          'penyebab_kematian',
          'hubungan_pemohon',
        ];
      }
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = async (formDataValues) => {
    if (!validateDocuments()) {
      setStep(3); // Go back to documents step if invalid
      return;
    }

    setSubmitting(true);
    setApiError(null);

    try {
      // Build FormData payload for API
      const payload = new FormData();
      payload.append('jenis_surat', jenisSurat);
      payload.append('nama_pemohon', formDataValues.nama_pemohon);
      payload.append('nik_pemohon', formDataValues.nik_pemohon);
      payload.append('no_hp', formDataValues.no_hp);
      payload.append('alamat_lengkap', formDataValues.alamat_lengkap);

      // JSONB Data Pribadi
      const dataPribadi = {
        tempat_lahir: formDataValues.tempat_lahir,
        tanggal_lahir: formDataValues.tanggal_lahir,
        jenis_kelamin: formDataValues.jenis_kelamin,
        agama: formDataValues.agama,
        pekerjaan: formDataValues.pekerjaan,
      };
      payload.append('data_pribadi', JSON.stringify(dataPribadi));

      // JSONB Data Tambahan per jenis
      let dataTambahan = {};
      if (jenisSurat === 'sktm') {
        dataTambahan = { keperluan: formDataValues.keperluan };
      } else if (jenisSurat === 'domisili') {
        dataTambahan = {
          alamat_asal: formDataValues.alamat_asal,
          alamat_domisili: formDataValues.alamat_domisili,
          keperluan: formDataValues.keperluan,
        };
      } else if (jenisSurat === 'kematian') {
        dataTambahan = {
          nama_almarhum: formDataValues.nama_almarhum,
          nik_almarhum: formDataValues.nik_almarhum,
          tanggal_kematian: formDataValues.tanggal_kematian,
          tempat_meninggal: formDataValues.tempat_meninggal,
          penyebab_kematian: formDataValues.penyebab_kematian,
          hubungan_pemohon: formDataValues.hubungan_pemohon,
        };
      }
      payload.append('data_tambahan', JSON.stringify(dataTambahan));

      // File Attachments
      for (const [key, fileObj] of Object.entries(documentFiles)) {
        if (fileObj) {
          payload.append(key, fileObj);
        }
      }

      // Call Backend API
      const res = await submitPengajuan(payload);
      setSubmitResult(res.data);
    } catch (err) {
      console.error('Submit error:', err);
      const msg = err.response?.data?.error?.message || err.message || 'Terjadi kesalahan saat submit form';
      setApiError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const currentValues = getValues();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Info */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Form Pengajuan Surat</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Step {step} dari 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{category.title}</h1>
          <p className="text-xs sm:text-sm text-slate-400">{category.desc}</p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
          <category.icon className="w-6 h-6" />
        </div>
      </div>

      {/* Wizard Progress Indicator */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {[
          { num: 1, label: 'Data Diri' },
          { num: 2, label: 'Detail Surat' },
          { num: 3, label: 'Dokumen' },
          { num: 4, label: 'Konfirmasi' },
        ].map((s) => (
          <div
            key={s.num}
            className={`p-3 rounded-2xl border text-center transition-all ${
              step === s.num
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10 font-bold'
                : step > s.num
                ? 'border-emerald-500/40 bg-slate-900/60 text-slate-300 font-semibold'
                : 'border-slate-800 bg-slate-900/30 text-slate-600 font-normal'
            }`}
          >
            <div className="text-xs sm:text-sm flex items-center justify-center gap-1.5">
              <span>{s.num}.</span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Api Error Alert */}
      {apiError && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Gagal Menyimpan Pengajuan</p>
            <p className="text-xs opacity-90">{apiError}</p>
          </div>
        </div>
      )}

      {/* Main Form Box */}
      <form onSubmit={handleSubmit(handleFinalSubmit)} className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8">
        
        {/* ─── STEP 1: DATA DIRI PEMOHON ────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <span>👤 Data Pribadi Pemohon</span>
              <span className="text-xs font-normal text-slate-400">(Wajib Diisi Sesuai KTP)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Nama Pemohon */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">Nama Lengkap Pemohon *</label>
                <input
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  {...register('nama_pemohon')}
                  className="glass-input w-full p-3.5 rounded-xl text-sm"
                />
                {errors.nama_pemohon && <p className="text-xs text-rose-400">{errors.nama_pemohon.message}</p>}
              </div>

              {/* NIK */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">NIK (16 Digit Angka) *</label>
                <input
                  type="text"
                  maxLength={16}
                  placeholder="3201012345670001"
                  {...register('nik_pemohon')}
                  className="glass-input w-full p-3.5 rounded-xl text-sm font-mono"
                />
                {errors.nik_pemohon && <p className="text-xs text-rose-400">{errors.nik_pemohon.message}</p>}
              </div>

              {/* No HP / WA */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">No. HP / WhatsApp Pemohon *</label>
                <input
                  type="text"
                  placeholder="081234567890"
                  {...register('no_hp')}
                  className="glass-input w-full p-3.5 rounded-xl text-sm"
                />
                {errors.no_hp && <p className="text-xs text-rose-400">{errors.no_hp.message}</p>}
              </div>

              {/* Tempat Lahir */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Tempat Lahir *</label>
                <input
                  type="text"
                  placeholder="Contoh: Jakarta"
                  {...register('tempat_lahir')}
                  className="glass-input w-full p-3.5 rounded-xl text-sm"
                />
                {errors.tempat_lahir && <p className="text-xs text-rose-400">{errors.tempat_lahir.message}</p>}
              </div>

              {/* Tanggal Lahir */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Tanggal Lahir *</label>
                <input
                  type="date"
                  {...register('tanggal_lahir')}
                  className="glass-input w-full p-3.5 rounded-xl text-sm"
                />
                {errors.tanggal_lahir && <p className="text-xs text-rose-400">{errors.tanggal_lahir.message}</p>}
              </div>

              {/* Jenis Kelamin */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Jenis Kelamin *</label>
                <select {...register('jenis_kelamin')} className="glass-input w-full p-3.5 rounded-xl text-sm bg-slate-900">
                  <option value="laki-laki">Laki-laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>

              {/* Agama */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Agama *</label>
                <select {...register('agama')} className="glass-input w-full p-3.5 rounded-xl text-sm bg-slate-900">
                  <option value="Islam">Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Khonghucu">Khonghucu</option>
                </select>
              </div>

              {/* Pekerjaan */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">Pekerjaan *</label>
                <input
                  type="text"
                  placeholder="Contoh: Karyawan Swasta / Wiraswasta / Ibu Rumah Tangga"
                  {...register('pekerjaan')}
                  className="glass-input w-full p-3.5 rounded-xl text-sm"
                />
                {errors.pekerjaan && <p className="text-xs text-rose-400">{errors.pekerjaan.message}</p>}
              </div>

              {/* Alamat Lengkap */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">Alamat Lengkap (Jalan/Dusun, RT/RW) *</label>
                <textarea
                  rows={3}
                  placeholder="Contoh: Jl. Merdeka No. 12, RT 003/RW 005, Dusun Mawar"
                  {...register('alamat_lengkap')}
                  className="glass-input w-full p-3.5 rounded-xl text-sm"
                />
                {errors.alamat_lengkap && <p className="text-xs text-rose-400">{errors.alamat_lengkap.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 2: DETAIL KEPERLUAN SURAT ──────────────────────── */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <span>📝 Rincian Keperluan {category.title}</span>
            </h3>

            {/* Fields khusus SKTM */}
            {jenisSurat === 'sktm' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Keperluan Pembuatan SKTM *</label>
                <textarea
                  rows={4}
                  placeholder="Contoh: Pengajuan Beasiswa Pendidikan Anak / Keringanan Biaya Rawat Inap RSUD / Bantuan Sosial"
                  {...register('keperluan')}
                  className="glass-input w-full p-3.5 rounded-xl text-sm"
                />
                {errors.keperluan && <p className="text-xs text-rose-400">{errors.keperluan.message}</p>}
              </div>
            )}

            {/* Fields khusus Domisili */}
            {jenisSurat === 'domisili' && (
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Alamat Asal (Sesuai KTP) *</label>
                  <textarea
                    rows={2}
                    placeholder="Alamat lengkap asal yang tertera di KTP"
                    {...register('alamat_asal')}
                    className="glass-input w-full p-3.5 rounded-xl text-sm"
                  />
                  {errors.alamat_asal && <p className="text-xs text-rose-400">{errors.alamat_asal.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Alamat Domisili Saat Ini *</label>
                  <textarea
                    rows={2}
                    placeholder="Alamat tempat tinggal domisili saat ini di wilayah kelurahan"
                    {...register('alamat_domisili')}
                    className="glass-input w-full p-3.5 rounded-xl text-sm"
                  />
                  {errors.alamat_domisili && <p className="text-xs text-rose-400">{errors.alamat_domisili.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Keperluan Pembuatan Surat Domisili *</label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Syarat Melamar Pekerjaan / Persyaratan Pembukaan Rekening Bank / Syarat Sekolah"
                    {...register('keperluan')}
                    className="glass-input w-full p-3.5 rounded-xl text-sm"
                  />
                  {errors.keperluan && <p className="text-xs text-rose-400">{errors.keperluan.message}</p>}
                </div>
              </div>
            )}

            {/* Fields khusus Kematian */}
            {jenisSurat === 'kematian' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Nama Lengkap Almarhum/Almarhumah *</label>
                  <input
                    type="text"
                    placeholder="Nama almarhum/ah sesuai KTP/KK"
                    {...register('nama_almarhum')}
                    className="glass-input w-full p-3.5 rounded-xl text-sm"
                  />
                  {errors.nama_almarhum && <p className="text-xs text-rose-400">{errors.nama_almarhum.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">NIK Almarhum/Almarhumah *</label>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="16 digit NIK almarhum"
                    {...register('nik_almarhum')}
                    className="glass-input w-full p-3.5 rounded-xl text-sm font-mono"
                  />
                  {errors.nik_almarhum && <p className="text-xs text-rose-400">{errors.nik_almarhum.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Tanggal Kematian *</label>
                  <input
                    type="date"
                    {...register('tanggal_kematian')}
                    className="glass-input w-full p-3.5 rounded-xl text-sm"
                  />
                  {errors.tanggal_kematian && <p className="text-xs text-rose-400">{errors.tanggal_kematian.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Tempat Meninggal *</label>
                  <input
                    type="text"
                    placeholder="Contoh: RSUD Kota / Rumah Duka"
                    {...register('tempat_meninggal')}
                    className="glass-input w-full p-3.5 rounded-xl text-sm"
                  />
                  {errors.tempat_meninggal && <p className="text-xs text-rose-400">{errors.tempat_meninggal.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Penyebab Kematian *</label>
                  <input
                    type="text"
                    placeholder="Contoh: Sakit Sakit Jantung / Usia Lanjut"
                    {...register('penyebab_kematian')}
                    className="glass-input w-full p-3.5 rounded-xl text-sm"
                  />
                  {errors.penyebab_kematian && <p className="text-xs text-rose-400">{errors.penyebab_kematian.message}</p>}
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Hubungan Pemohon dengan Almarhum/ah *</label>
                  <input
                    type="text"
                    placeholder="Contoh: Anak / Suami / Istri / Orang Tua / Saudara Kandung"
                    {...register('hubungan_pemohon')}
                    className="glass-input w-full p-3.5 rounded-xl text-sm"
                  />
                  {errors.hubungan_pemohon && <p className="text-xs text-rose-400">{errors.hubungan_pemohon.message}</p>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── STEP 3: UPLOAD DOKUMEN ───────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📎 Upload Foto Dokumen Persyaratan</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Pastikan foto dokumen terlihat jelas, tidak buram, dan berukuran di bawah 5MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {requirements.map((req) => (
                <DocumentUploader
                  key={req.key}
                  name={req.key}
                  label={req.label}
                  required={req.required}
                  onChange={handleDocumentChange}
                  error={documentErrors[req.key]}
                />
              ))}
            </div>
          </div>
        )}

        {/* ─── STEP 4: REKAP & SUBMIT ───────────────────────────────── */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <span>📋 Rekap Peninjauan Data</span>
            </h3>

            <div className="glass-card p-5 rounded-2xl border border-slate-700/60 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-slate-400 font-medium">Nama Pemohon:</span>
                  <p className="text-white font-bold">{currentValues.nama_pemohon}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">NIK Pemohon:</span>
                  <p className="text-white font-mono font-bold">{currentValues.nik_pemohon}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">No. WhatsApp:</span>
                  <p className="text-white font-bold">{currentValues.no_hp}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Jenis Surat:</span>
                  <p className="text-emerald-400 font-bold">{category.title}</p>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-medium block mb-1">Dokumen Ter-upload:</span>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(documentFiles).map(([key, file]) => {
                    if (!file) return null;
                    const reqObj = requirements.find((r) => r.key === key);
                    return (
                      <span
                        key={key}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/30 flex items-center gap-1 font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {reqObj ? reqObj.label : key}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
              <p>
                Dengan menekan tombol <strong>"Submit & Lanjut ke WhatsApp"</strong>, Anda menyatakan bahwa data dan berkas yang diunggah adalah benar. Sistem akan mengarahkan Anda ke WhatsApp Admin Kelurahan.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              disabled={submitting}
              className="glass-card px-5 py-3 rounded-xl text-slate-300 hover:text-white font-semibold text-sm flex items-center gap-2 border border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="gradient-btn px-7 py-3 rounded-xl text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="gradient-btn-wa px-8 py-3.5 rounded-xl text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-emerald-500/25"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memproses Upload...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Submit & Lanjut ke WhatsApp</span>
                </>
              )}
            </button>
          )}
        </div>

      </form>

      {/* Success Redirect Modal */}
      {submitResult && (
        <SuccessModal
          data={submitResult}
          onClose={() => setSubmitResult(null)}
        />
      )}

    </div>
  );
}
