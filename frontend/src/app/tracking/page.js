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
  ExternalLink,
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
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Tracking Layanan</span>
        <h1 className="text-3xl font-bold text-white tracking-tight">Cek Status Pengajuan Surat</h1>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Masukkan Kode Tracking UUID yang Anda dapatkan saat pertama kali melakukan submit pengajuan.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="glass-panel p-4 rounded-3xl border border-slate-800 flex gap-3 shadow-xl">
        <div className="relative flex-grow">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Masukkan Kode Tracking UUID..."
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            className="glass-input w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm font-mono placeholder:font-sans"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="gradient-btn px-6 py-3.5 rounded-2xl text-white font-bold text-sm shrink-0 flex items-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          <span>Cari</span>
        </button>
      </form>

      {/* Error View */}
      {error && (
        <div className="glass-panel p-6 rounded-2xl border border-rose-500/30 bg-rose-500/5 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Pengajuan Tidak Ditemukan</h3>
          <p className="text-xs text-rose-300 max-w-sm mx-auto">{error}</p>
        </div>
      )}

      {/* Data Result Timeline View */}
      {data && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 animate-in fade-in duration-200">
          
          {/* Top Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-emerald-400 block mb-1">ID: {data.id}</span>
              <h2 className="text-xl font-bold text-white">{data.jenis_surat_label || data.jenis_surat}</h2>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <User className="w-3.5 h-3.5 text-slate-500" /> Pemohon: <strong className="text-slate-300">{data.nama_pemohon}</strong>
              </p>
            </div>

            {/* Status Pill Badge */}
            <div className="shrink-0">
              {data.status === 'pending' && (
                <span className="px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Pending / Menunggu Verifikasi
                </span>
              )}
              {data.status === 'processed' && (
                <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-bold flex items-center gap-1.5">
                  <Loader2 className="w-4 h-4 animate-spin" /> Sedang Diproses Admin
                </span>
              )}
              {data.status === 'completed' && (
                <span className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Surat Selesai
                </span>
              )}
              {data.status === 'rejected' && (
                <span className="px-4 py-2 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Pengajuan Ditolak
                </span>
              )}
            </div>
          </div>

          {/* PDF Download Button (If available) */}
          {data.pdf_url && (
            <div className="glass-card p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Bukti Pengajuan PDF Diterbitkan</h4>
                  <p className="text-[11px] text-slate-400">Unduh dokumen resmi bukti pendaftaran Anda</p>
                </div>
              </div>

              <a
                href={data.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-btn px-4 py-2.5 rounded-xl text-white font-semibold text-xs flex items-center gap-1.5 shrink-0 shadow-md"
              >
                <span>Unduh PDF</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Status Timeline */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Progres Verifikasi Berkas</h3>
            
            <div className="relative pl-6 space-y-8 before:absolute before:left-2 font-normal before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              
              {/* Step 1: Submit */}
              <div className="relative">
                <span className="absolute -left-[23px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-900" />
                <h4 className="text-sm font-bold text-white">Form Pengajuan & PDF Bukti Diterbitkan</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Diajukan pada: {new Date(data.created_at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB
                </p>
              </div>

              {/* Step 2: Processing */}
              <div className="relative">
                <span
                  className={`absolute -left-[23px] top-0 w-4 h-4 rounded-full border-4 border-slate-900 ${
                    data.status !== 'pending' ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                />
                <h4 className={`text-sm font-bold ${data.status !== 'pending' ? 'text-white' : 'text-slate-500'}`}>
                  Verifikasi Dokumen Kelurahan
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Admin memeriksa keabsahan foto KTP, KK, dan Surat Pengantar RT/RW.
                </p>
              </div>

              {/* Step 3: Final */}
              <div className="relative">
                <span
                  className={`absolute -left-[23px] top-0 w-4 h-4 rounded-full border-4 border-slate-900 ${
                    data.status === 'completed' ? 'bg-emerald-500' : data.status === 'rejected' ? 'bg-rose-500' : 'bg-slate-700'
                  }`}
                />
                <h4
                  className={`text-sm font-bold ${
                    data.status === 'completed'
                      ? 'text-emerald-400'
                      : data.status === 'rejected'
                      ? 'text-rose-400'
                      : 'text-slate-500'
                  }`}
                >
                  {data.status === 'completed'
                    ? 'Surat Siap Diambil di Kantor Kelurahan'
                    : data.status === 'rejected'
                    ? 'Pengajuan Ditolak / Perlu Perbaikan'
                    : 'Surat Selesai Diterbitkan'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
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
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading tracking page...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
