'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, Copy, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function SuccessModal({ data, onClose }) {
  useEffect(() => {
    // Fire celebratory confetti
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel border border-emerald-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Glow backdrop decorative effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Icon & Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Pengajuan Berhasil Disubmit!</h3>
          <p className="text-sm text-slate-300">
            Data Anda telah tersimpan di sistem kelurahan. Langkah berikutnya adalah mengirimkan rekap ke WhatsApp Admin.
          </p>
        </div>

        {/* ID Code Box */}
        <div className="glass-card p-4 rounded-2xl border border-slate-700/80 space-y-2">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">Kode Tracking Pengajuan</span>
          <div className="flex items-center justify-between gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="font-mono text-sm text-emerald-400 font-bold truncate">{data.id}</span>
            <button
              onClick={handleCopyId}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shrink-0 flex items-center gap-1 text-xs"
            >
              <Copy className="w-3.5 h-3.5" /> Salin
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            *Simpan kode ini untuk mengecek status pengajuan surat Anda kapan saja.
          </p>
        </div>

        {/* Primary Action: WA Deep Link */}
        <div className="space-y-3 pt-2">
          <a
            href={data.wa_deep_link}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-btn-wa w-full py-4 px-6 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 group"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span>Kirim Rekap ke WA Admin</span>
            <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <Link
            href={`/tracking?id=${data.id}`}
            className="block text-center text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors py-2"
          >
            Cek Status Pengajuan →
          </Link>
        </div>

      </div>
    </div>
  );
}
