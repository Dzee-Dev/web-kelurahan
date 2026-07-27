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
    <section id="profil" className="py-16 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Profil Kelurahan Mesjid Priyayi
          </h2>
          <p className="mt-2 text-gray-500 text-sm max-w-lg mx-auto">
            Kecamatan Kasemen, Kota Serang — Banten
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="inline-flex border border-gray-200 rounded-lg overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
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
                <img src="/logo.jpeg" alt="Logo" className="w-12 h-12 rounded-lg object-contain" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Kelurahan Mesjid Priyayi</h3>
                  <p className="text-sm text-gray-500">Kecamatan Kasemen, Kota Serang, Provinsi Banten</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                Kelurahan Mesjid Priyayi merupakan salah satu wilayah administratif di Kecamatan Kasemen, Kota Serang yang memiliki sejarah panjang dan potensi wilayah yang beraneka ragam di bidang pertanian, pemukiman, serta keagamaan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-4 space-y-1">
                  <div className="text-xs text-gray-500 font-medium">Alamat Kantor</div>
                  <p className="text-sm text-gray-800 font-medium flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    Jl. Mesjid Priyayi No. 75, Kasemen 42191, Serang — Banten
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 space-y-1">
                  <div className="text-xs text-gray-500 font-medium">Email Resmi</div>
                  <p className="text-sm text-gray-800 font-medium flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="truncate">mesjidpriyayikelurahan@gmail.com</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-3">
              {[
                { value: '9.082', label: 'Jumlah Penduduk', unit: 'Jiwa', color: 'text-green-700' },
                { value: '282,44', label: 'Luas Wilayah', unit: 'Hektar', color: 'text-blue-700' },
                { value: '5 / 19', label: 'RW / RT', unit: '', color: 'text-amber-700' },
                { value: '16', label: 'Kampung', unit: '', color: 'text-gray-700' },
              ].map((stat, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  {stat.unit && <div className="text-[11px] text-gray-400">{stat.unit}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: VISI & MISI */}
        {activeTab === 'visi-misi' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-gray-900 rounded-lg p-8 text-center text-white">
              <div className="text-xs font-semibold text-amber-400 mb-3">Visi</div>
              <h3 className="text-lg sm:text-xl font-bold leading-relaxed">
                "Mewujudkan Pelayanan Publik Kelurahan Mesjid Priyayi yang Prima, Transparan, Akuntabel, Berbasis Digital dan Berakhlakul Karimah"
              </h3>
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
                    <span className="flex-none w-6 h-6 rounded bg-gray-100 text-gray-800 text-xs font-bold flex items-center justify-center mt-0.5">
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
              { icon: Home, title: 'Wilayah Pemukiman', desc: '16 Kampung & 2 Komplek Perumahan (GBA & GSR)' },
              { icon: BookOpen, title: 'Sarana Pendidikan', desc: '4 SD, 1 SLTP, 1 SMK, 3 Diniyah' },
              { icon: HeartPulse, title: 'Sarana Kesehatan', desc: '1 Puskesmas, 1 Pustu, 10 Posyandu' },
              { icon: Landmark, title: 'Sarana Ibadah', desc: '10 Masjid & 9 Mushola / Langgar' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-gray-50 rounded-lg p-5 space-y-2">
                  <Icon className="w-5 h-5 text-gray-500" />
                  <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
