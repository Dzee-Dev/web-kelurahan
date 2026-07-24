'use client';

import { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, X, AlertCircle } from 'lucide-react';

export default function DocumentUploader({ label, name, required = true, onChange, error }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // Check size limit (5MB)
    if (selected.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    setFile(selected);
    if (onChange) onChange(name, selected);

    // Create preview if image
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
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
          {label}
          {required ? <span className="text-rose-400">*</span> : <span className="text-slate-500 font-normal">(Opsional)</span>}
        </label>
        {file && (
          <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> File SIAP
          </span>
        )}
      </div>

      {!file ? (
        <label className={`block cursor-pointer rounded-xl border-2 border-dashed p-4 text-center transition-all ${
          error ? 'border-rose-500/50 bg-rose-500/5' : 'border-slate-700/60 bg-slate-900/40 hover:border-emerald-500/50 hover:bg-slate-800/40'
        }`}>
          <input
            type="file"
            name={name}
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-400">
              <UploadCloud className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs text-slate-300 font-medium">Klik atau Drag file foto/PDF</span>
            <span className="text-[10px] text-slate-500">Maks. 5MB (JPG, PNG, PDF)</span>
          </div>
        </label>
      ) : (
        <div className="glass-panel p-3 rounded-xl flex items-center justify-between border border-emerald-500/30 bg-emerald-950/10">
          <div className="flex items-center gap-3 overflow-hidden">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="w-10 h-10 object-cover rounded-lg border border-slate-700 shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
            )}
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-200 truncate">{file.name}</p>
              <p className="text-[10px] text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Hapus file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <p className="text-[11px] text-rose-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}
