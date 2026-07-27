'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText, Home, UserCheck, Search, ArrowRight,
  CheckCircle2, MessageCircle, AlertCircle, FileCheck, ChevronRight,
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
      color: 'border-l-green-600',
      requirements: ['Surat Pengantar RT/RW', 'KTP Pemohon', 'Kartu Keluarga (KK)'],
    },
    {
      id: 'domisili',
      title: 'Surat Domisili',
      fullTitle: 'Surat Keterangan Domisili',
      desc: 'Untuk pendaftaran sekolah, melamar kerja, atau buka rekening.',
      icon: Home,
      color: 'border-l-blue-600',
      requirements: ['Surat Pengantar RT/RW', 'KTP Pemohon', 'Kartu Keluarga (KK)'],
    },
    {
      id: 'kematian',
      title: 'Surat Kematian',
      fullTitle: 'Surat Keterangan Kematian',
      desc: 'Untuk Akta Kematian Dukcapil, klaim asuransi, atau ahli waris.',
      icon: UserCheck,
      color: 'border-l-gray-600',
      requirements: ['Pengantar RT/RW', 'KTP Pemohon', 'KTP & KK Almarhum', 'Surat Kematian RS', 'KTP 2 Saksi'],
    },
  ];

  return (
    <div>
      
      {/* ── HERO ── */}
      <section className="bg-white border-b border-gray-200 py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-5">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Layanan Surat Kelurahan
              <br />
              <span className="text-green-700">Online & Resmi</span>
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg">
              Warga Kelurahan Mesjid Priyayi kini dapat mengajukan surat keterangan secara mandiri dari rumah. Lengkap dengan bukti tanda terima PDF resmi dan notifikasi WhatsApp ke petugas.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Gratis, tanpa pungli
              </span>
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-blue-600" />
                PDF tanda terima
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-green-600" />
                Notifikasi WhatsApp
              </span>
            </div>

            {/* Tracking */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 max-w-md">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Search className="w-4 h-4 text-gray-500" />
                Cek status pengajuan
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
            <div className="text-sm font-medium text-gray-500 mb-1">Pilih layanan surat:</div>
            {services.map((s) => {
              const IconComp = s.icon;
              return (
                <Link
                  key={s.id}
                  href={`/pengajuan/${s.id}`}
                  className={`block bg-white border border-gray-200 ${s.color} border-l-4 rounded-lg p-4 hover:bg-gray-50 transition-colors group`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconComp className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{s.fullTitle}</div>
                        <div className="text-xs text-gray-500">{s.desc}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
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
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center">
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
                <div key={s.id} className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <IconComp className="w-5 h-5 text-gray-500" />
                      <h3 className="font-bold text-gray-900">{s.fullTitle}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{s.desc}</p>

                    <div className="pt-3 border-t border-gray-100 space-y-2">
                      <div className="text-xs font-semibold text-gray-500">Dokumen yang dibutuhkan:</div>
                      <ul className="space-y-1.5">
                        {s.requirements.map((req, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
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
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Alur Pengajuan</h2>
            <p className="mt-2 text-gray-500 text-sm">Proses sederhana dari rumah hingga surat selesai.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '1', title: 'Isi Formulir', desc: 'Pilih jenis surat, isi data diri dan NIK Anda.' },
              { step: '2', title: 'Upload Dokumen', desc: 'Unggah foto KTP, KK, dan surat pengantar RT/RW.' },
              { step: '3', title: 'Terima Bukti', desc: 'Sistem menerbitkan PDF tanda terima dan mengirim data ke WhatsApp admin.' },
              { step: '4', title: 'Ambil Surat', desc: 'Datang ke kantor kelurahan pada jam kerja untuk mengambil surat fisik.' },
            ].map((item) => (
              <div key={item.step} className="bg-white border border-gray-200 rounded-lg p-5 space-y-2">
                <div className="w-8 h-8 rounded bg-gray-900 text-white text-sm font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
