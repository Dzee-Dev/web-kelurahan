'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, Copy, FileText, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function SuccessModal({ data, onClose }) {
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  if (!data) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(data.id);
    alert('Kode Pengajuan berhasil disalin!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Icon & Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Pengajuan Berhasil Disubmit!</h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Data Anda & Dokumen Bukti Pengajuan PDF resmi telah diterbitkan oleh sistem kelurahan.
          </p>
        </div>

        {/* ID Code Box */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-bold block">Kode Tracking Pengajuan</span>
          <div className="flex items-center justify-between gap-2 bg-white p-3 rounded-xl border border-slate-300">
            <span className="font-mono text-sm text-blue-900 font-bold truncate">{data.id}</span>
            <button
              onClick={handleCopyId}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors shrink-0 flex items-center gap-1 text-xs font-semibold"
            >
              <Copy className="w-3.5 h-3.5" /> Salin
            </button>
          </div>
        </div>

        {/* PDF Download Button */}
        {data.pdf_url && (
          <a
            href={data.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-2xl bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-300 hover:bg-emerald-100 flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>Unduh / Cetak Bukti PDF Tanda Terima</span>
            <Download className="w-4 h-4" />
          </a>
        )}

        {/* Primary Action: WA Deep Link */}
        <div className="space-y-3 pt-1">
          <a
            href={data.wa_deep_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full py-4 px-6 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-3 shadow-md group"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Kirim Rekap & PDF ke WA Admin</span>
            <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <Link
            href={`/tracking?id=${data.id}`}
            className="block text-center text-xs font-bold text-slate-600 hover:text-blue-900 transition-colors py-2"
          >
            Cek Status Pengajuan →
          </Link>
        </div>

      </div>
    </div>
  );
}
