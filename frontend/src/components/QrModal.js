'use client';

import { useState, useEffect } from 'react';
import { QrCode, Download, X, Copy, Check, ExternalLink, Smartphone } from 'lucide-react';

export default function QrModal({ isOpen, onClose }) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.origin);
    }
  }, []);

  if (!isOpen) return null;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(currentUrl || 'https://web-kelurahan.vercel.app')}&margin=10`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `QR_Code_Web_Kelurahan_Mesjid_Priyayi.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      window.open(qrImageUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
            <QrCode className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">QR Code Akses Website</h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            Scan barcode ini dengan kamera HP warga untuk langsung membuka portal pelayanan Kelurahan Mesjid Priyayi.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="bg-gradient-to-b from-gray-50 to-emerald-50/30 p-6 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center">
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-md inline-block">
            <img
              src={qrImageUrl}
              alt="QR Code Website Kelurahan"
              className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg"
            />
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-800 font-semibold bg-emerald-100/80 px-3 py-1.5 rounded-full">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Tinggal Scan Menggunakan Kamera HP</span>
          </div>
        </div>

        {/* URL Link Box */}
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center justify-between gap-2 text-xs">
          <span className="font-mono text-gray-600 truncate font-medium">{currentUrl}</span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1 font-semibold shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin' : 'Salin'}</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            className="btn-emerald w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Gambar QR Code (PNG)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
