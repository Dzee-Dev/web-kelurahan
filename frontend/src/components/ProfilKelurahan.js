'use client';

import { useState } from 'react';
import { Building2, MapPin, Target, CheckCircle2, Home, Landmark, BookOpen, HeartPulse } from 'lucide-react';

export default function ProfilKelurahan() {
  const [activeTab, setActiveTab] = useState('profil');

  const tabs = [
    { id: 'profil', label: 'Gambaran Umum' },
    { id: 'visi-misi', label: 'Visi & Misi' },
    { id: 'statistik', label: 'Wilayah & Demografi' },
  ];

  return (
    <section id="profil" className="py-16 bg-gray-50 border-t border-gray-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        
        {/* Section Title */}
        <div className="text-center">
          <div className="section-label">Tentang Kami</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Profil Kelurahan Mesjid Priyayi
          </h2>
          <p className="mt-2 text-gray-500 text-sm max-w-lg mx-auto">
            Kecamatan Kasemen, Kota Serang — Banten
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="inline-flex bg-white border border-gray-200 rounded-lg p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB: GAMBARAN UMUM */}
        {activeTab === 'profil' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 space-y-5">
              <div className="flex items-center gap-3">
                <img src="/logo.jpeg" alt="Logo" className="w-12 h-12 rounded-lg object-contain shadow-sm border border-gray-100" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Kelurahan Mesjid Priyayi</h3>
                  <p className="text-sm text-gray-500">Kecamatan Kasemen, Kota Serang, Provinsi Banten</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                Kelurahan Mesjid Priyayi merupakan salah satu wilayah administratif di Kecamatan Kasemen, Kota Serang yang memiliki sejarah panjang dan potensi wilayah yang beraneka ragam di bidang pertanian, pemukiman, serta keagamaan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="card p-4 space-y-1">
                  <div className="text-xs text-gray-400 font-medium">Alamat Kantor</div>
                  <p className="text-sm text-gray-800 font-medium flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    Jl. Mesjid Priyayi No. 75, Kasemen 42191, Serang — Banten
                  </p>
                </div>
                <div className="card p-4 space-y-1">
                  <div className="text-xs text-gray-400 font-medium">Email Resmi</div>
                  <p className="text-sm text-gray-800 font-medium flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="truncate">mesjidpriyayikelurahan@gmail.com</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-3">
              {[
                { value: '9.082', label: 'Penduduk', sub: 'Jiwa', border: 'border-l-4 border-l-emerald-500' },
                { value: '282,44', label: 'Luas Wilayah', sub: 'Hektar', border: 'border-l-4 border-l-blue-500' },
                { value: '5 / 19', label: 'RW / RT', sub: '', border: 'border-l-4 border-l-amber-500' },
                { value: '16', label: 'Kampung', sub: '', border: 'border-l-4 border-l-gray-400' },
              ].map((stat, i) => (
                <div key={i} className={`card p-4 ${stat.border}`}>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  {stat.sub && <div className="text-[11px] text-gray-400">{stat.sub}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: VISI & MISI */}
        {activeTab === 'visi-misi' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-gray-900 rounded-xl p-8 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 hero-pattern" />
              <div className="relative">
                <div className="text-xs font-semibold text-amber-400 mb-3 tracking-wider">VISI</div>
                <h3 className="text-lg sm:text-xl font-bold leading-relaxed">
                  "Mewujudkan Pelayanan Publik Kelurahan Mesjid Priyayi yang Prima, Transparan, Akuntabel, Berbasis Digital dan Berakhlakul Karimah"
                </h3>
              </div>
            </div>

            <div>
              <h4 className="text-base font-bold text-gray-900 mb-4">Misi</h4>
              <ol className="space-y-3">
                {[
                  'Meningkatkan mutu pelayanan administrasi kependudukan yang cepat, bebas pungli, dan berbasis teknologi.',
                  'Mendorong pemberdayaan ekonomi masyarakat lokal di bidang pertanian, perdagangan, dan UMKM.',
                  'Memelihara ketentraman, ketertiban umum, serta kerukunan antarwarga masyarakat.',
                  'Meningkatkan kualitas sarana prasarana lingkungan, pendidikan, dan kesehatan warga.',
                ].map((misi, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="flex-none w-7 h-7 rounded-md bg-gray-900 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{misi}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* TAB: STATISTIK DEMOGRAFI */}
        {activeTab === 'statistik' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Home, title: 'Wilayah Pemukiman', desc: '16 Kampung & 2 Komplek Perumahan (GBA & GSR)', color: 'text-blue-600' },
              { icon: BookOpen, title: 'Sarana Pendidikan', desc: '4 SD, 1 SLTP, 1 SMK, 3 Diniyah', color: 'text-emerald-600' },
              { icon: HeartPulse, title: 'Sarana Kesehatan', desc: '1 Puskesmas, 1 Pustu, 10 Posyandu', color: 'text-rose-600' },
              { icon: Landmark, title: 'Sarana Ibadah', desc: '10 Masjid & 9 Mushola / Langgar', color: 'text-amber-600' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="card p-5 space-y-3">
                  <div className={`w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
