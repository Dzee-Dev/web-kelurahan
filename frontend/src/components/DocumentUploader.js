'use client';

import { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, X, AlertCircle } from 'lucide-react';

export default function DocumentUploader({ label, name, required = true, onChange, error }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (selected.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    setFile(selected);
    if (onChange) onChange(name, selected);

    if (selected.type.startsWith('image/')) {
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    if (onChange) onChange(name, null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
          {label}
          {required ? <span className="text-rose-600">*</span> : <span className="text-slate-400 font-normal">(Opsional)</span>}
        </label>
        {file && (
          <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle className="w-3 h-3 text-emerald-600" /> FILE SIAP
          </span>
        )}
      </div>

      {!file ? (
        <label className={`block cursor-pointer rounded-xl border-2 border-dashed p-4 text-center transition-all bg-slate-50 hover:bg-white hover:shadow-sm ${
          error ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300 hover:border-blue-500'
        }`}>
          <input
            type="file"
            name={name}
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
              <UploadCloud className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-700 font-semibold">Klik / Drag Foto / PDF Surat</span>
            <span className="text-[10px] text-slate-500">Maksimal 5MB (Format JPG, PNG, PDF)</span>
          </div>
        </label>
      ) : (
        <div className="p-3 rounded-xl flex items-center justify-between border border-emerald-300 bg-emerald-50/60">
          <div className="flex items-center gap-3 overflow-hidden">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0 bg-white" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
            )}
            <div className="truncate">
              <p className="text-xs font-bold text-slate-800 truncate">{file.name}</p>
              <p className="text-[10px] text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="p-1.5 rounded-lg bg-white text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
            title="Hapus file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <p className="text-[11px] text-rose-600 flex items-center gap-1 font-medium">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}
