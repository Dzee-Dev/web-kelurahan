'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText, Home, UserCheck, Search, ArrowRight,
  CheckCircle2, MessageCircle, AlertCircle, FileCheck, ChevronRight, Clock,
} from 'lucide-react';
import ProfilKelurahan from '@/components/ProfilKelurahan';
import StrukturOrganisasi from '@/components/StrukturOrganisasi';

export default function LandingPage() {
  const router = useRouter();
  const [trackingInput, setTrackingInput] = useState('');

  const handleSearchTracking = (e) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    router.push(`/tracking?id=${encodeURIComponent(trackingInput.trim())}`);
  };

  const services = [
    {
      id: 'sktm',
      title: 'SKTM',
      fullTitle: 'Surat Keterangan Tidak Mampu',
      desc: 'Untuk beasiswa, keringanan biaya RS, atau bantuan sosial.',
      icon: FileText,
      accent: 'border-l-emerald-600 hover:bg-emerald-50/50',
      iconColor: 'text-emerald-700',
      requirements: ['Surat Pengantar RT/RW', 'KTP Pemohon', 'Kartu Keluarga (KK)'],
    },
    {
      id: 'domisili',
      title: 'Surat Domisili',
      fullTitle: 'Surat Keterangan Domisili',
      desc: 'Untuk pendaftaran sekolah, melamar kerja, atau buka rekening.',
      icon: Home,
      accent: 'border-l-blue-600 hover:bg-blue-50/50',
      iconColor: 'text-blue-700',
      requirements: ['Surat Pengantar RT/RW', 'KTP Pemohon', 'Kartu Keluarga (KK)'],
    },
    {
      id: 'kematian',
      title: 'Surat Kematian',
      fullTitle: 'Surat Keterangan Kematian',
      desc: 'Untuk Akta Kematian, klaim asuransi, atau penetapan ahli waris.',
      icon: UserCheck,
      accent: 'border-l-slate-600 hover:bg-slate-50/50',
      iconColor: 'text-slate-600',
      requirements: ['Pengantar RT/RW', 'KTP Pemohon', 'KTP & KK Almarhum', 'Surat Kematian RS', 'KTP 2 Saksi'],
    },
  ];

  return (
    <div>
      
      {/* ── HERO ── */}
      <section className="relative bg-white border-b border-gray-200 overflow-hidden">
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 hero-pattern" />
        
        {/* Accent stripe */}
        <div className="h-1 bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-600" />
        
        <div className="relative py-14 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              {/* Logo + nama */}
              <div className="flex items-center gap-3">
                <img src="/logo.jpeg" alt="Logo" className="w-11 h-11 rounded-lg object-contain shadow-sm border border-gray-100" />
                <div className="text-sm text-gray-500 font-medium">
                  Kelurahan Mesjid Priyayi — Kec. Kasemen, Kota Serang
                </div>
              </div>

              <h1 className="text-3xl sm:text-[2.75rem] font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                Layanan Surat
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-blue-700">
                  Online & Resmi
                </span>
              </h1>

              <p className="text-gray-600 leading-relaxed max-w-lg">
                Ajukan surat keterangan kependudukan langsung dari rumah. Gratis, cepat, dan dilengkapi bukti tanda terima PDF resmi serta notifikasi ke WhatsApp petugas kelurahan.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Gratis tanpa pungli
                </span>
                <span className="flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  PDF tanda terima
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  Notifikasi WhatsApp
                </span>
              </div>

              {/* Tracking */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2.5 max-w-md">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-gray-400" />
                  Lacak Status Pengajuan
                </label>
                <form onSubmit={handleSearchTracking} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Masukkan kode tracking..."
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    className="natural-input flex-grow"
                    required
                  />
                  <button type="submit" className="btn-primary flex items-center gap-1.5 whitespace-nowrap">
                    Lacak
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* Service quick links */}
            <div className="space-y-3">
              <div className="text-sm font-semibold text-gray-500 mb-2">Pilih layanan surat:</div>
              {services.map((s) => {
                const IconComp = s.icon;
                return (
                  <Link
                    key={s.id}
                    href={`/pengajuan/${s.id}`}
                    className={`block bg-white border border-gray-200 ${s.accent} border-l-4 rounded-lg p-4 transition-all group`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center ${s.iconColor}`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-[15px]">{s.fullTitle}</div>
                          <div className="text-sm text-gray-500 mt-0.5">{s.desc}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  </Link>
                );
              })}

              {/* Jam layanan */}
              <div className="flex items-center gap-2 pt-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Formulir online 24 jam · Verifikasi Senin–Jumat 08.00–15.00</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── HIMBAUAN ── */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 text-sm text-amber-800">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Pastikan dokumen jelas —</span>{' '}
            Foto KTP, KK, dan Surat Pengantar RT/RW harus terlihat jelas dan tidak buram (maks. 5MB per file).
          </div>
        </div>
      </section>

      {/* ── PROFIL ── */}
      <ProfilKelurahan />

      {/* ── STRUKTUR ORGANISASI ── */}
      <StrukturOrganisasi />

      {/* ── DETAIL LAYANAN ── */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center">
            <div className="section-label">Layanan Surat</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Persyaratan Dokumen
            </h2>
            <p className="mt-2 text-gray-500 text-sm max-w-lg mx-auto">
              Siapkan dokumen berikut sebelum mengisi formulir pengajuan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((s) => {
              const IconComp = s.icon;
              return (
                <div key={s.id} className="card p-6 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center ${s.iconColor}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-gray-900">{s.fullTitle}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{s.desc}</p>

                    <div className="pt-3 border-t border-gray-100 space-y-2">
                      <div className="text-xs font-semibold text-gray-500">Dokumen yang dibutuhkan:</div>
                      <ul className="space-y-1.5">
                        {s.requirements.map((req, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href={`/pengajuan/${s.id}`}
                    className="btn-primary text-center flex items-center justify-center gap-2"
                  >
                    Ajukan Surat
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ALUR PENGAJUAN ── */}
      <section className="py-16 bg-gray-50 border-t border-gray-200 px-4">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center">
            <div className="section-label">Prosedur</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Alur Pengajuan Surat</h2>
            <p className="mt-2 text-gray-500 text-sm">4 langkah sederhana dari rumah sampai surat jadi.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '1', title: 'Isi Formulir', desc: 'Pilih jenis surat, isi data diri dan NIK Anda di formulir online.' },
              { step: '2', title: 'Upload Dokumen', desc: 'Unggah foto KTP, KK, dan surat pengantar RT/RW yang jelas.' },
              { step: '3', title: 'Terima Bukti', desc: 'Sistem menerbitkan PDF tanda terima resmi dan kirim data ke WA admin.' },
              { step: '4', title: 'Ambil Surat', desc: 'Datang ke kantor kelurahan pada jam kerja untuk mengambil surat fisik.' },
            ].map((item, idx) => (
              <div key={item.step} className="card p-5 space-y-3 relative">
                <div className="w-9 h-9 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <h4 className="font-bold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-8 -right-3 text-gray-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
