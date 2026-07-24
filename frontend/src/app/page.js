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
  Zap,
  CheckCircle2,
  Clock,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

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
      desc: 'Untuk pengajuan beasiswa sekolah/kuliah, bantuan sosial, atau keringanan biaya pengobatan Rumah Sakit.',
      icon: FileText,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Populer',
      requirements: ['Surat Pengantar RT/RW', 'KTP Pemohon', 'Kartu Keluarga (KK)'],
    },
    {
      id: 'domisili',
      title: 'Surat Keterangan Domisili',
      desc: 'Untuk pendaftaran sekolah, syarat perbankan, melamar pekerjaan, atau legalitas tempat tinggal sementara.',
      icon: Home,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Wajib Domisili',
      requirements: ['Surat Pengantar RT/RW', 'KTP Pemohon', 'Kartu Keluarga (KK)'],
    },
    {
      id: 'kematian',
      title: 'Surat Keterangan Kematian',
      desc: 'Untuk pengurusan akta kematian, klaim asuransi/BPJS, perbankan, atau penetapan ahli waris.',
      icon: UserCheck,
      color: 'from-rose-500 to-amber-600',
      badge: 'Layanan Dukcapil',
      requirements: ['Pengantar RT/RW', 'KTP Pemohon', 'KTP & KK Almarhum', 'Surat Kematian RS', 'KTP 2 Saksi'],
    },
  ];

  return (
    <div className="space-y-24 pb-16">
      
      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Glow backdrop decorative elements */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-lg shadow-emerald-500/10">
            <Zap className="w-4 h-4 text-emerald-400 fill-current animate-pulse" />
            <span>Pelayanan Mandiri 3 Kategori Surat Kelurahan Online</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Pengajuan Surat Kelurahan <br />
            <span className="gradient-text">SKTM, Domisili, & Kematian Online</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Isi form data diri secara mandiri, unggah berkasnya, dan dapatkan respon terintegrasi langsung via Official WhatsApp Admin Kelurahan.
          </p>

          {/* Quick Category Buttons in Hero */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pengajuan/sktm"
              className="glass-card px-5 py-3 rounded-2xl text-emerald-400 font-bold text-sm border border-emerald-500/30 hover:bg-emerald-500/10 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> 📄 1. SKTM
            </Link>
            <Link
              href="/pengajuan/domisili"
              className="glass-card px-5 py-3 rounded-2xl text-blue-400 font-bold text-sm border border-blue-500/30 hover:bg-blue-500/10 flex items-center gap-2"
            >
              <Home className="w-4 h-4" /> 🏠 2. Surat Domisili
            </Link>
            <Link
              href="/pengajuan/kematian"
              className="glass-card px-5 py-3 rounded-2xl text-rose-400 font-bold text-sm border border-rose-500/30 hover:bg-rose-500/10 flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" /> 👤 3. Surat Kematian
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#layanan-surat"
              className="gradient-btn w-full sm:w-auto px-8 py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25 group"
            >
              <Sparkles className="w-5 h-5" />
              <span>Pilih Jenis Surat Di Bawah</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <Link
              href="#tracking-widget"
              className="glass-card w-full sm:w-auto px-6 py-4 rounded-2xl text-slate-200 hover:text-white font-semibold text-base flex items-center justify-center gap-2 border border-slate-700/80"
            >
              <Search className="w-5 h-5 text-emerald-400" />
              <span>Cek Status Pengajuan</span>
            </Link>
          </div>

          {/* Key Features Badges */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-300">Aman & Terverifikasi</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-300">Integrasi WA Official</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-300">Proses Bebas Antre</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-300">Gratis 100% Layanan</span>
            </div>
          </div>

        </div>
      </section>

      {/* ─── KARTU LAYANAN SURAT ──────────────────────────────────────── */}
      <section id="layanan-surat" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-28">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Semua Kategori Surat</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Pilih Jenis Surat Yang Ingin Diajukan
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Tersedia 3 jenis pengajuan surat utama di kelurahan. Klik salah satu di bawah untuk langsung membuka formulir pengajuan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group border border-slate-800"
              >
                {service.badge && (
                  <span className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-500/30">
                    {service.badge}
                  </span>
                )}

                <div className="space-y-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${service.color} p-0.5 shadow-lg`}>
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white">
                      <IconComponent className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {service.desc}
                  </p>

                  {/* Requirements List */}
                  <div className="pt-4 border-t border-slate-800/80 space-y-2">
                    <span className="text-xs font-semibold text-slate-300 block">Persyaratan Dokumen:</span>
                    <ul className="space-y-1.5">
                      {service.requirements.map((req, idx) => (
                        <li key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Button Action */}
                <Link
                  href={`/pengajuan/${service.id}`}
                  className="gradient-btn w-full py-3.5 px-4 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 group-hover:shadow-emerald-500/25 transition-all"
                >
                  <span>Buat Surat Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── QUICK TRACKING WIDGET ───────────────────────────────────── */}
      <section id="tracking-widget" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel border border-emerald-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <Search className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Sudah Mengajukan Surat Sebelumnya?</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Lacak status pengajuan surat Anda secara realtime menggunakan Kode Tracking UUID pengajuan.
            </p>
          </div>

          <form onSubmit={handleSearchTracking} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Masukkan Kode Tracking (contoh: 550e8400-e29b-41d4...)"
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
              className="glass-input flex-grow px-5 py-4 rounded-2xl text-sm font-mono placeholder:font-sans placeholder:text-slate-500"
              required
            />
            <button
              type="submit"
              className="gradient-btn px-8 py-4 rounded-2xl text-white font-bold text-sm shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <span>Cek Status</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* ─── ALUR PELAYANAN ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Langkah Praktis</span>
          <h2 className="text-3xl font-bold text-white">Bagaimana Alur Pengajuan Surat Berjalan?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Pilih & Isi Form',
              desc: 'Pilih jenis surat dan lengkapi data diri beserta rincian keperluan surat Anda.',
            },
            {
              step: '02',
              title: 'Upload Dokumen',
              desc: 'Unggah foto Surat Pengantar RT/RW, KTP, KK, dan berkas pendukung lainnya.',
            },
            {
              step: '03',
              title: 'Redirect WhatsApp',
              desc: 'Klik tombol untuk mengirimkan rekap pengajuan otomatis ke WhatsApp Admin Kelurahan.',
            },
            {
              step: '04',
              title: 'Verifikasi & Ambil',
              desc: 'Petugas kelurahan memproses berkas Anda. Anda tinggal datang mengambil fisik surat.',
            },
          ].map((item, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3 relative">
              <span className="text-4xl font-black text-slate-800 block">{item.step}</span>
              <h4 className="text-base font-bold text-white">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
