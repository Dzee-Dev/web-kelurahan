'use client';

import { Award, Building2, User, ShieldCheck, HeartHandshake, UserCheck, Briefcase, ChevronDown } from 'lucide-react';

export default function StrukturOrganisasi() {
  return (
    <section id="struktur" className="py-16 bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-100/60 border-y border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold shadow-sm">
            <Building2 className="w-4 h-4 text-amber-700" />
            <span>Pemerintahan Kelurahan Mesjid Priyayi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bagan Struktur Organisasi & Tata Kerja
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Bagan resmi aparatur pemerintahan Kelurahan Mesjid Priyayi, Kecamatan Kasemen, Kota Serang - Banten dalam melayani seluruh kebutuhan masyarakat.
          </p>
        </div>

        {/* ORGANIZATIONAL TREE DIAGRAM */}
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* LEVEL 1: KEPALA KELURAHAN (LURAH) */}
          <div className="flex justify-center">
            <div className="bg-white border-2 border-amber-400 rounded-2xl p-6 shadow-xl max-w-md w-full text-center space-y-3 hover:shadow-2xl transition-shadow relative">
              
              {/* Crown Top Badge */}
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-md border-2 border-amber-300 -mt-10">
                <Award className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-widest inline-block">
                  Kepala Kelurahan (Lurah)
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2 tracking-tight">
                  H. SYARIF, S.Ip M.Si
                </h3>
                <p className="text-xs font-mono font-bold text-amber-800 mt-1">
                  NIP. 197108112008011003
                </p>
              </div>

            </div>
          </div>

          {/* Vertical Connecting Line 1 */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-amber-400"></div>
          </div>

          {/* LEVEL 2: SEKRETARIS KELURAHAN */}
          <div className="flex justify-center">
            <div className="bg-white border-2 border-blue-600 rounded-2xl p-6 shadow-lg max-w-lg w-full space-y-4 hover:shadow-xl transition-shadow">
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center mx-auto shadow-md border border-blue-700">
                  <Briefcase className="w-6 h-6 text-amber-400" />
                </div>

                <div>
                  <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 uppercase tracking-wider inline-block">
                    Sekretaris Kelurahan
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                    SETYO PURUHITO, SE
                  </h4>
                  <p className="text-xs font-mono font-semibold text-blue-800">
                    NIP. 197512182014101001
                  </p>
                </div>
              </div>

              {/* Sub Staff Secretariat */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                  Pelaksana Sekretariat:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">FIKRI FAUZI</span>
                      <span className="text-[10px] text-slate-500">Staff Pelaksana Umum</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">ULFAH</span>
                      <span className="text-[10px] text-slate-500">Pramubakti</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Vertical Connecting Line 2 */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-blue-600"></div>
          </div>

          {/* Horizontal Connector Line for 3 Columns */}
          <div className="hidden md:block relative">
            <div className="border-t-2 border-slate-300 w-2/3 mx-auto"></div>
            <div className="flex justify-between w-2/3 mx-auto -mt-0.5">
              <div className="w-0.5 h-6 bg-slate-300"></div>
              <div className="w-0.5 h-6 bg-slate-300"></div>
              <div className="w-0.5 h-6 bg-slate-300"></div>
            </div>
          </div>

          {/* LEVEL 3: 3 KEPALA SEKSI (KASI) & PELAKSANA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Kasi 1: Pemerintahan */}
            <div className="bg-white border-2 border-slate-200 hover:border-emerald-500 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center mx-auto shrink-0 font-bold">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 uppercase tracking-wider inline-block">
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
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">BAHRANI</span>
                    <span className="text-[10px] text-emerald-800 font-medium">Operator Lampid</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kasi 2: Pemberdayaan Masyarakat */}
            <div className="bg-white border-2 border-slate-200 hover:border-blue-500 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 border border-blue-300 flex items-center justify-center mx-auto shrink-0 font-bold">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200 uppercase tracking-wider inline-block">
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
            <div className="bg-white border-2 border-slate-200 hover:border-amber-500 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center mx-auto shrink-0 font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wider inline-block">
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
