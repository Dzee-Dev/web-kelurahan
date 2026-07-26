'use client';

import { Award, UserCheck, ShieldCheck, HeartHandshake, ChevronDown, User, Sparkles, Building2 } from 'lucide-react';

export default function StrukturOrganisasi() {
  return (
    <section id="struktur" className="py-16 bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-100/60 border-y border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold shadow-sm">
            <Building2 className="w-4 h-4 text-blue-700" />
            <span>Pemerintahan Kelurahan Mesjid Priyayi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bagan Struktur Organisasi & Tata Kerja
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Struktur kepemimpinan dan perangkat aparatur Kelurahan Mesjid Priyayi, Kecamatan Kasemen, Kota Serang - Banten yang siap memberikan pelayanan publik terbaik untuk warga.
          </p>
        </div>

        {/* ORGANIZATIONAL TREE CONTAINER */}
        <div className="relative space-y-10">
          
          {/* LEVEL 1: KEPALA KELURAHAN (LURAH) */}
          <div className="flex justify-center">
            <div className="relative group max-w-md w-full">
              {/* Glow animation ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
              
              <div className="relative bg-white border-2 border-amber-400 rounded-2xl p-6 shadow-xl space-y-3 text-center transition-all group-hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center mx-auto shadow-sm">
                  <Award className="w-8 h-8 text-amber-600" />
                </div>

                <div>
                  <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-widest">
                    Kepala Kelurahan (Lurah)
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2 tracking-tight">
                    H. SYARIF, S.Ip M.Si
                  </h3>
                  <p className="text-xs font-mono font-bold text-amber-800 mt-0.5">
                    NIP. 197108112008011003
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Connecting Line Level 1 -> Level 2 */}
          <div className="flex justify-center">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-blue-600 rounded-full animate-pulse"></div>
          </div>

          {/* LEVEL 2: SEKRETARIS KELURAHAN & STAFF */}
          <div className="flex justify-center">
            <div className="relative group max-w-lg w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
              
              <div className="relative bg-white border-2 border-blue-600 rounded-2xl p-6 shadow-lg space-y-4 transition-all group-hover:-translate-y-1">
                
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 uppercase tracking-wider">
                    Sekretaris Kelurahan
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                    SETYO PURUHITO, SE
                  </h4>
                  <p className="text-xs font-mono font-semibold text-blue-800">
                    NIP. 197512182014101001
                  </p>
                </div>

                {/* Sub Staff Pelaksana Secretariat */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-center">
                    Pelaksana Sekretariat:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-700 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 block">FIKRI FAUZI</span>
                        <span className="text-[10px] text-slate-500">Staff Pelaksana Umum</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-700 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 block">ULFAH</span>
                        <span className="text-[10px] text-slate-500">Pramubakti</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Vertical Connecting Line Level 2 -> Level 3 */}
          <div className="flex justify-center">
            <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
          </div>

          {/* LEVEL 3: 3 KEPALA SEKSI (KASI) & PELAKSANA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Kasi 1: Pemerintahan */}
            <div className="natural-card p-6 bg-white border-2 border-slate-200 hover:border-emerald-500 transition-all space-y-4 shadow-md flex flex-col justify-between group">
              <div className="space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center mx-auto shrink-0 font-bold group-hover:scale-105 transition-transform">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 uppercase tracking-wider">
                    Kasi Pemerintahan
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-2 leading-snug">
                    RHIKE NURHAIDA, SE M.Si
                  </h4>
                  <p className="text-[11px] font-mono font-semibold text-emerald-800 mt-0.5">
                    NIP. 198409062010012005
                  </p>
                </div>
              </div>

              {/* Pelaksana */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                  Pelaksana Teknis:
                </span>
                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">BAHRANI</span>
                    <span className="text-[10px] text-emerald-800 font-medium">Operator Lampid</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kasi 2: Pemberdayaan Masyarakat */}
            <div className="natural-card p-6 bg-white border-2 border-slate-200 hover:border-blue-500 transition-all space-y-4 shadow-md flex flex-col justify-between group">
              <div className="space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 border border-blue-200 flex items-center justify-center mx-auto shrink-0 font-bold group-hover:scale-105 transition-transform">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200 uppercase tracking-wider">
                    Kasi Pemberdayaan Masyarakat
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-2 leading-snug">
                    DEDEH ROCHMAEDAH, S.Kep, MM
                  </h4>
                  <p className="text-[11px] font-mono font-semibold text-blue-800 mt-0.5">
                    NIP. 198101262008012005
                  </p>
                </div>
              </div>

              {/* Pelaksana */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                  Pelaksana Teknis:
                </span>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-center text-slate-400 italic">
                  - (Dalam Proses Pengisian)
                </div>
              </div>
            </div>

            {/* Kasi 3: Ketentraman, Ketertiban dan Linmas */}
            <div className="natural-card p-6 bg-white border-2 border-slate-200 hover:border-amber-500 transition-all space-y-4 shadow-md flex flex-col justify-between group">
              <div className="space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 border border-amber-200 flex items-center justify-center mx-auto shrink-0 font-bold group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wider">
                    Kasi Trantib & Linmas
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-2 leading-snug">
                    SALMAN AL FARISHI, ST
                  </h4>
                  <p className="text-[11px] font-mono font-semibold text-amber-800 mt-0.5">
                    NIP. 199504022019021004
                  </p>
                </div>
              </div>

              {/* Pelaksana */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                  Pelaksana Teknis:
                </span>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-center text-slate-400 italic">
                  - (Dalam Proses Pengisian)
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
