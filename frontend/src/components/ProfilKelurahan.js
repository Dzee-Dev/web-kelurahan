'use client';

import { useState } from 'react';
import { Building2, MapPin, Users, Target, CheckCircle2, Home, Landmark, BookOpen, HeartPulse } from 'lucide-react';

export default function ProfilKelurahan() {
  const [activeTab, setActiveTab] = useState('profil');

  return (
    <section id="profil" className="py-16 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold shadow-sm">
            <Landmark className="w-4 h-4 text-emerald-700" />
            <span>Profil Kelurahan Mesjid Priyayi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Mengenal Lebih Dekat Kelurahan Mesjid Priyayi
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Kecamatan Kasemen, Kota Serang - Banten. Melayani warga dengan integritas, transparansi, dan kemudahan teknologi digital.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex justify-center border-b border-slate-200">
          <div className="flex gap-2 sm:gap-6 overflow-x-auto no-scrollbar pb-2">
            {[
              { id: 'profil', label: '🏛️ Gambaran Umum' },
              { id: 'visi-misi', label: '🎯 Visi & Misi' },
              { id: 'statistik', label: '📊 Wilayah & Demografi' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: GAMBARAN UMUM */}
        {activeTab === 'profil' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-sm">
                  <img src="/logo.jpeg" alt="Logo Kelurahan Mesjid Priyayi" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Kelurahan Mesjid Priyayi</h3>
                  <p className="text-xs text-blue-900 font-semibold">Kecamatan Kasemen, Kota Serang, Provinsi Banten</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                Kelurahan Mesjid Priyayi merupakan salah satu wilayah administratif di Kecamatan Kasemen, Kota Serang yang memiliki sejarah panjang dan potensi wilayah yang beraneka ragam di bidang pertanian, pemukiman, serta keagamaan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Alamat Kantor Kelurahan</span>
                  <p className="text-xs text-slate-800 font-bold flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>Jl. Mesjid Priyayi No. 75, Kasemen 42191, Serang - Banten</span>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Email Resmi Pelayanan</span>
                  <p className="text-xs text-slate-800 font-bold flex items-center gap-1.5 truncate">
                    <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="truncate">mesjidpriyayikelurahan@gmail.com</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="natural-card p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/60 border-emerald-200 text-center space-y-1">
                <span className="text-2xl font-black text-emerald-900 block">9.082</span>
                <span className="text-xs font-bold text-emerald-800">Jumlah Penduduk (Jiwa)</span>
              </div>
              <div className="natural-card p-5 bg-gradient-to-br from-blue-50 to-blue-100/60 border-blue-200 text-center space-y-1">
                <span className="text-2xl font-black text-blue-900 block">282,44</span>
                <span className="text-xs font-bold text-blue-800">Luas Wilayah (Ha)</span>
              </div>
              <div className="natural-card p-5 bg-gradient-to-br from-amber-50 to-amber-100/60 border-amber-200 text-center space-y-1">
                <span className="text-2xl font-black text-amber-900 block">5 RW / 19 RT</span>
                <span className="text-xs font-bold text-amber-800">Wilayah RT & RW</span>
              </div>
              <div className="natural-card p-5 bg-gradient-to-br from-slate-100 to-slate-200/80 border-slate-300 text-center space-y-1">
                <span className="text-2xl font-black text-slate-900 block">16 Kampung</span>
                <span className="text-xs font-bold text-slate-700">Wilayah Pemukiman</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VISI & MISI */}
        {activeTab === 'visi-misi' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
            {/* Visi */}
            <div className="natural-card p-6 sm:p-8 bg-gradient-to-r from-blue-900 to-slate-900 text-white space-y-3 text-center rounded-3xl shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Visi Kelurahan Mesjid Priyayi</span>
              <h3 className="text-lg sm:text-2xl font-extrabold leading-relaxed">
                "Mewujudkan Pelayanan Publik Kelurahan Mesjid Priyayi yang Prima, Transparan, Akuntabel, Berbasis Digital dan Berakhlakul Karimah"
              </h3>
            </div>

            {/* Misi */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Misi Pembangunan Kelurahan:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Meningkatkan mutu pelayanan administrasi kependudukan yang cepat, bebas pungli, dan berbasis teknologi.',
                  'Mendorong pemberdayaan ekonomi masyarakat lokal di bidang pertanian, perdagangan, dan UMKM.',
                  'Memelihara ketentraman, ketertiban umum, serta kerukunan antarwarga masyarakat.',
                  'Meningkatkan kualitas sarana prasarana lingkungan, pendidikan, dan kesehatan warga.',
                ].map((misi, idx) => (
                  <div key={idx} className="natural-card p-4 bg-slate-50 border-slate-200 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">{misi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STATISTIK DEMOGRAFI */}
        {activeTab === 'statistik' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-200">
            <div className="natural-card p-5 bg-white border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <Home className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-500 uppercase">Wilayah Pemukiman</h4>
              <p className="text-sm font-extrabold text-slate-900">16 Kampung & 2 Komplek Perumahan (GBA & GSR)</p>
            </div>

            <div className="natural-card p-5 bg-white border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-500 uppercase">Sarana Pendidikan</h4>
              <p className="text-sm font-extrabold text-slate-900">4 Sekolah Dasar, 1 SLTP, 1 SMK, 3 Diniyah</p>
            </div>

            <div className="natural-card p-5 bg-white border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-500 uppercase">Sarana Kesehatan</h4>
              <p className="text-sm font-extrabold text-slate-900">1 Puskesmas, 1 Pustu, 10 Posyandu Aktif</p>
            </div>

            <div className="natural-card p-5 bg-white border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-500 uppercase">Sarana Ibadah</h4>
              <p className="text-sm font-extrabold text-slate-900">10 Masjid & 9 Mushola/Langgar</p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
