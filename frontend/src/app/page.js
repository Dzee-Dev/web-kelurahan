'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Home,
  UserCheck,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MessageCircle,
  Building2,
  AlertCircle,
  FileCheck,
  Download,
  HelpCircle,
  ChevronRight,
  Users,
  MapPin,
  Landmark,
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
      title: 'Surat Keterangan Tidak Mampu (SKTM)',
      desc: 'Untuk pengajuan beasiswa pendidikan, keringanan biaya rawat inap Rumah Sakit, atau permohonan bantuan sosial.',
      icon: FileText,
      badge: 'Paling Sering Diajukan',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-100 text-emerald-700',
      btnColor: 'bg-emerald-700 hover:bg-emerald-800 text-white',
      requirements: ['Surat Pengantar RT/RW', 'KTP Pemohon', 'Kartu Keluarga (KK)'],
    },
    {
      id: 'domisili',
      title: 'Surat Keterangan Domisili',
      desc: 'Persyaratan pendataan tempat tinggal sementara, pendaftaran sekolah anak, melamar pekerjaan, atau pembukaan rekening bank.',
      icon: Home,
      badge: 'Layanan Tinggal',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      iconBg: 'bg-blue-100 text-blue-700',
      btnColor: 'bg-blue-900 hover:bg-blue-800 text-white',
      requirements: ['Surat Pengantar RT/RW', 'KTP Pemohon', 'Kartu Keluarga (KK)'],
    },
    {
      id: 'kematian',
      title: 'Surat Keterangan Kematian',
      desc: 'Untuk pembuatan Akta Kematian di Dukcapil, klaim BPJS/Asuransi, penetapan ahli waris, atau perbankan almarhum.',
      icon: UserCheck,
      badge: 'Layanan Dukcapil',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      iconBg: 'bg-amber-100 text-amber-700',
      btnColor: 'bg-slate-900 hover:bg-slate-800 text-white',
      requirements: ['Pengantar RT/RW', 'KTP Pemohon', 'KTP & KK Almarhum', 'Surat Kematian RS', 'KTP 2 Saksi'],
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* ─── HERO SECTION (SPLIT NATURAL LAYOUT WITH LOGO) ─────────────── */}
      <section className="bg-gradient-to-b from-blue-50/80 via-slate-50 to-slate-100/60 border-b border-slate-200/80 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Alert Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-800 text-xs font-bold">
              <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                <img src="/logo.jpeg" alt="Logo Emblem" className="w-full h-full object-contain" />
              </div>
              <span>Kelurahan Mesjid Priyayi, Kasemen - Kota Serang</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Pelayanan Surat Kelurahan <br />
              <span className="text-blue-900">Mesjid Priyayi Online & Resmi</span>
            </h1>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Warga Kelurahan Mesjid Priyayi kini dapat mengajukan <strong className="text-slate-900 font-bold">Surat SKTM</strong>, <strong className="text-slate-900 font-bold">Surat Domisili</strong>, dan <strong className="text-slate-900 font-bold">Surat Kematian</strong> secara mandiri dari rumah. Lengkap dengan diterbitkannya <strong className="text-emerald-700 font-bold">PDF Bukti Tanda Terima Resmi</strong> & Notifikasi WhatsApp.
            </p>

            {/* Fast Tracking Bar */}
            <div className="natural-card p-4 border border-slate-300 bg-white space-y-2 shadow-sm max-w-xl">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Search className="w-4 h-4 text-blue-700" /> Cek Status Pengajuan Yang Pernah Dibuat
              </label>
              <form onSubmit={handleSearchTracking} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Masukkan Kode Tracking UUID pengajuan..."
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  className="natural-input flex-grow px-3.5 py-2 text-xs font-mono"
                  required
                />
                <button type="submit" className="btn-emerald px-4 py-2 text-xs font-bold shrink-0 flex items-center gap-1">
                  <span>Lacak</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Gratis Tanpa Pungli</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span>PDF Tanda Terima Resmi</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Official Admin</span>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Interactive Service Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Pilih Layanan Surat Mandiri:
            </div>

            <div className="space-y-3">
              {services.map((s) => {
                const IconComp = s.icon;
                return (
                  <Link
                    key={s.id}
                    href={`/pengajuan/${s.id}`}
                    className="natural-card p-4 block hover:border-blue-400 transition-all group bg-white"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center shrink-0`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-900 transition-colors">
                            {s.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ─── ANNOUNCEMENT BAR ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-amber-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0 font-bold">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm block">Himbauan Pengunggahan Berkas Persyaratan:</span>
              <span>Pastikan foto KTP, Kartu Keluarga (KK), dan Surat Pengantar RT/RW terlihat jelas dan tidak buram (maksimal 5MB).</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROFIL KELURAHAN MESJID PRIYAYI ──────────────────────────── */}
      <ProfilKelurahan />

      {/* ─── STRUKTUR ORGANISASI KELURAHAN MESJID PRIYAYI ─────────────── */}
      <StrukturOrganisasi />

      {/* ─── DETAIL 3 KATEGORI LAYANAN ────────────────────────────────── */}
      <section id="layanan-surat" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-28">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Kategori Pelayanan Surat</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Rincian & Persyaratan Surat Kelurahan
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Silakan periksa kelengkapan berkas yang perlu disiapkan sebelum mengisi formulir online di bawah ini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => {
            const IconComp = s.icon;
            return (
              <div key={s.id} className="natural-card p-6 flex flex-col justify-between space-y-6 bg-white border-slate-200">
                <div className="space-y-4">
                  
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl ${s.iconBg} flex items-center justify-center font-bold`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${s.badgeColor}`}>
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>

                  {/* Requirements */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-slate-700 block">Dokumen Wajib Di-upload:</span>
                    <ul className="space-y-1.5">
                      {s.requirements.map((req, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                <Link
                  href={`/pengajuan/${s.id}`}
                  className={`w-full py-3 px-4 ${s.btnColor} font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all`}
                >
                  <span>Ajukan Surat Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── ALUR PELAYANAN 4 LANGKAH ─────────────────────────────────── */}
      <section className="bg-slate-100/70 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Prosedur Praktis</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">4 Langkah Mudah Pengajuan Surat</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Isi Data Diri',
                desc: 'Pilih jenis surat dan masukkan data NIK, nama, serta detail keperluan Anda.',
              },
              {
                step: '02',
                title: 'Upload Dokumen',
                desc: 'Unggah foto Surat Pengantar RT/RW, KTP, dan KK pendukung.',
              },
              {
                step: '03',
                title: 'Cetak PDF / WA',
                desc: 'Sistem menerbitkan PDF bukti tanda terima dan mengirim rekap ke WA Admin.',
              },
              {
                step: '04',
                title: 'Ambil Fisik Surat',
                desc: 'Petugas memproses surat. Anda tinggal mengambil fisik surat pada jam kerja.',
              },
            ].map((item, idx) => (
              <div key={idx} className="natural-card p-6 bg-white space-y-2 border-slate-200">
                <span className="text-3xl font-black text-blue-900 block">{item.step}</span>
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
