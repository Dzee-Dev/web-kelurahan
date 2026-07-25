'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getPengajuanStatus } from '@/lib/api';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Loader2,
  User,
  Download,
  XCircle,
} from 'lucide-react';

function TrackingContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [idInput, setIdInput] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchStatus = async (searchId) => {
    if (!searchId.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await getPengajuanStatus(searchId.trim());
      setData(res.data);
    } catch (err) {
      console.error('Tracking fetch error:', err);
      const msg = err.response?.data?.error?.message || 'Kode tracking tidak ditemukan atau tidak valid.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      fetchStatus(initialId);
    }
  }, [initialId]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStatus(idInput);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Tracking Pelayanan</span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Cek Status Pengajuan Surat</h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Masukkan Kode Tracking UUID yang Anda dapatkan saat melakukan submit pengajuan.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="natural-card p-3 bg-white border-slate-300 flex gap-2 shadow-sm">
        <div className="relative flex-grow">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Masukkan Kode Tracking UUID (contoh: 550e8400-e29b...)"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            className="natural-input w-full pl-12 pr-4 py-3 text-xs font-mono"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-emerald px-6 py-3 text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-sm"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          <span>Cari Status</span>
        </button>
      </form>

      {/* Error View */}
      {error && (
        <div className="natural-card p-6 border-rose-200 bg-rose-50 text-center space-y-2">
          <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">Pengajuan Tidak Ditemukan</h3>
          <p className="text-xs text-rose-700 max-w-sm mx-auto">{error}</p>
        </div>
      )}

      {/* Data Result Timeline View */}
      {data && (
        <div className="natural-card p-6 sm:p-8 bg-white border-slate-200 space-y-8 animate-in fade-in duration-200">
          
          {/* Top Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono text-blue-900 block font-bold mb-1">ID: {data.id}</span>
              <h2 className="text-xl font-bold text-slate-900">{data.jenis_surat_label || data.jenis_surat}</h2>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <User className="w-3.5 h-3.5 text-slate-400" /> Pemohon: <strong className="text-slate-700">{data.nama_pemohon}</strong>
              </p>
            </div>

            {/* Status Pill Badge */}
            <div className="shrink-0">
              {data.status === 'pending' && (
                <span className="px-4 py-2 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-700" /> Pending / Menunggu Verifikasi
                </span>
              )}
              {data.status === 'processed' && (
                <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold flex items-center gap-1.5">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-700" /> Sedang Diproses Admin
                </span>
              )}
              {data.status === 'completed' && (
                <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Surat Selesai
                </span>
              )}
              {data.status === 'rejected' && (
                <span className="px-4 py-2 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-700" /> Pengajuan Ditolak
                </span>
              )}
            </div>
          </div>

          {/* PDF Download Button */}
          {data.pdf_url && (
            <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-200/80 text-emerald-800 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Bukti Pengajuan PDF Diterbitkan</h4>
                  <p className="text-[11px] text-slate-600">Unduh dokumen resmi bukti pendaftaran Anda</p>
                </div>
              </div>

              <a
                href={data.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-emerald px-4 py-2 text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <span>Unduh PDF</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Status Timeline */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Progres Verifikasi Berkas</h3>
            
            <div className="relative pl-6 space-y-8 before:absolute before:left-2 font-normal before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              
              {/* Step 1: Submit */}
              <div className="relative">
                <span className="absolute -left-[23px] top-0 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-sm" />
                <h4 className="text-sm font-bold text-slate-900">Form Pengajuan & PDF Bukti Diterbitkan</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Diajukan pada: {new Date(data.created_at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB
                </p>
              </div>

              {/* Step 2: Processing */}
              <div className="relative">
                <span
                  className={`absolute -left-[23px] top-0 w-4 h-4 rounded-full border-4 border-white shadow-sm ${
                    data.status !== 'pending' ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                />
                <h4 className={`text-sm font-bold ${data.status !== 'pending' ? 'text-slate-900' : 'text-slate-400'}`}>
                  Verifikasi Dokumen Kelurahan
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Admin memeriksa keabsahan foto KTP, KK, dan Surat Pengantar RT/RW.
                </p>
              </div>

              {/* Step 3: Final */}
              <div className="relative">
                <span
                  className={`absolute -left-[23px] top-0 w-4 h-4 rounded-full border-4 border-white shadow-sm ${
                    data.status === 'completed' ? 'bg-emerald-600' : data.status === 'rejected' ? 'bg-rose-600' : 'bg-slate-300'
                  }`}
                />
                <h4
                  className={`text-sm font-bold ${
                    data.status === 'completed'
                      ? 'text-emerald-700'
                      : data.status === 'rejected'
                      ? 'text-rose-700'
                      : 'text-slate-400'
                  }`}
                >
                  {data.status === 'completed'
                    ? 'Surat Siap Diambil di Kantor Kelurahan'
                    : data.status === 'rejected'
                    ? 'Pengajuan Ditolak / Perlu Perbaikan'
                    : 'Surat Selesai Diterbitkan'}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {data.status === 'completed'
                    ? 'Silakan datang ke Kantor Kelurahan pada jam operasional untuk mengambil fisik surat.'
                    : 'Bawalah KTP asli pemohon saat pengambilan surat.'}
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading tracking page...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
