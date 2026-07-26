'use client';

import { Award, Building2, User, Sparkles, ShieldCheck, HeartHandshake, UserCheck } from 'lucide-react';

// Component Avatar Siluet Manusia Formal Pria
function MaleSilhouette({ color = 'blue' }) {
  const gradientMap = {
    gold: 'from-amber-400 to-amber-600 border-amber-300',
    blue: 'from-blue-600 to-indigo-700 border-blue-300',
    emerald: 'from-emerald-600 to-teal-700 border-emerald-300',
    slate: 'from-slate-700 to-slate-900 border-slate-400',
  };

  return (
    <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr ${gradientMap[color] || gradientMap.blue} p-1 shadow-lg mx-auto shrink-0 group-hover:scale-105 transition-transform duration-300`}>
      <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-end justify-center relative border-2 border-white/40">
        {/* Head silhouette */}
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-200 absolute top-3 shadow-inner"></div>
        {/* Shoulders & Suit silhouette */}
        <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-t-full bg-slate-100 relative top-1">
          {/* Tie detail */}
          <div className="w-2.5 h-6 bg-slate-800 mx-auto mt-0.5 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}

// Component Avatar Siluet Manusia Formal Wanita
function FemaleSilhouette({ color = 'emerald' }) {
  const gradientMap = {
    gold: 'from-amber-400 to-amber-600 border-amber-300',
    blue: 'from-blue-500 to-indigo-600 border-blue-300',
    emerald: 'from-emerald-500 to-teal-600 border-emerald-300',
    amber: 'from-amber-500 to-orange-600 border-amber-300',
  };

  return (
    <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr ${gradientMap[color] || gradientMap.emerald} p-1 shadow-lg mx-auto shrink-0 group-hover:scale-105 transition-transform duration-300`}>
      <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-end justify-center relative border-2 border-white/40">
        {/* Head silhouette */}
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-200 absolute top-3 shadow-inner"></div>
        {/* Hijab / Collar silhouette */}
        <div className="w-16 h-13 sm:w-20 sm:h-15 rounded-t-full bg-slate-200 relative top-1">
          <div className="w-full h-full bg-slate-300 rounded-t-full"></div>
        </div>
      </div>
    </div>
  );
}

export default function StrukturOrganisasi() {
  return (
    <section id="struktur" className="py-16 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-100/70 border-y border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold shadow-sm">
            <Building2 className="w-4 h-4 text-blue-700" />
            <span>Pemerintahan Kelurahan Mesjid Priyayi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bagan Struktur Organisasi Aparatur
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Hirarki kepemimpinan dan profil aparatur Kelurahan Mesjid Priyayi, Kecamatan Kasemen, Kota Serang - Banten dalam melayani seluruh kebutuhan warga.
          </p>
        </div>

        {/* ORGANIZATIONAL TREE CONTAINER */}
        <div className="relative space-y-10">
          
          {/* LEVEL 1: KEPALA KELURAHAN (LURAH) */}
          <div className="flex justify-center">
            <div className="relative group max-w-md w-full">
              {/* Gold Ambient Glow Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-3xl blur opacity-35 group-hover:opacity-75 transition duration-300"></div>
              
              <div className="relative bg-white border-2 border-amber-400 rounded-3xl p-6 shadow-xl space-y-4 text-center transition-all group-hover:-translate-y-1">
                
                {/* Silhouette Avatar Pria (Lurah) */}
                <div className="relative inline-block">
                  <MaleSilhouette color="gold" />
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1.5 rounded-full border-2 border-white shadow-md">
                    <Award className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-widest">
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
          </div>

          {/* Vertical Connecting Line Level 1 -> Level 2 */}
          <div className="flex justify-center">
            <div className="w-1.5 h-10 bg-gradient-to-b from-amber-400 via-blue-500 to-blue-700 rounded-full animate-pulse shadow-sm"></div>
          </div>

          {/* LEVEL 2: SEKRETARIS KELURAHAN & STAFF */}
          <div className="flex justify-center">
            <div className="relative group max-w-lg w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl blur opacity-25 group-hover:opacity-55 transition duration-300"></div>
              
              <div className="relative bg-white border-2 border-blue-600 rounded-3xl p-6 shadow-lg space-y-5 transition-all group-hover:-translate-y-1">
                
                {/* Silhouette Avatar Pria (Sekretaris) */}
                <div className="text-center space-y-3">
                  <MaleSilhouette color="blue" />
                  <div>
                    <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 uppercase tracking-wider">
                      Sekretaris Kelurahan
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mt-2">
                      SETYO PURUHITO, SE
                    </h4>
                    <p className="text-xs font-mono font-semibold text-blue-800 mt-0.5">
                      NIP. 197512182014101001
                    </p>
                  </div>
                </div>

                {/* Sub Staff Pelaksana Secretariat */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-center">
                    Pelaksana Sekretariat:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 shadow-sm hover:border-blue-300 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 block">FIKRI FAUZI</span>
                        <span className="text-[10px] text-slate-500 font-medium">Staff Pelaksana Umum</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 shadow-sm hover:border-emerald-300 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 block">ULFAH</span>
                        <span className="text-[10px] text-slate-500 font-medium">Pramubakti</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Vertical Connecting Line Level 2 -> Level 3 */}
          <div className="flex justify-center">
            <div className="w-1.5 h-10 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
          </div>

          {/* LEVEL 3: 3 KEPALA SEKSI (KASI) & PELAKSANA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Kasi 1: Pemerintahan */}
            <div className="natural-card p-6 bg-white border-2 border-slate-200 hover:border-emerald-500 transition-all space-y-4 shadow-md flex flex-col justify-between group rounded-3xl">
              <div className="space-y-3 text-center">
                <FemaleSilhouette color="emerald" />
                <div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 uppercase tracking-wider">
                    Kasi Pemerintahan
                  </span>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mt-2 leading-snug">
                    RHIKE NURHAIDA, SE M.Si
                  </h4>
                  <p className="text-[11px] font-mono font-semibold text-emerald-800 mt-0.5">
                    NIP. 198409062010012005
                  </p>
                </div>
              </div>

              {/* Pelaksana */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                  Pelaksana Teknis:
                </span>
                <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs flex items-center gap-3 shadow-sm">
                  <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">BAHRANI</span>
                    <span className="text-[10px] text-emerald-900 font-medium">Operator Lampid</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kasi 2: Pemberdayaan Masyarakat */}
            <div className="natural-card p-6 bg-white border-2 border-slate-200 hover:border-blue-500 transition-all space-y-4 shadow-md flex flex-col justify-between group rounded-3xl">
              <div className="space-y-3 text-center">
                <FemaleSilhouette color="blue" />
                <div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200 uppercase tracking-wider">
                    Kasi Pemberdayaan Masyarakat
                  </span>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mt-2 leading-snug">
                    DEDEH ROCHMAEDAH, S.Kep, MM
                  </h4>
                  <p className="text-[11px] font-mono font-semibold text-blue-800 mt-0.5">
                    NIP. 198101262008012005
                  </p>
                </div>
              </div>

              {/* Pelaksana */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                  Pelaksana Teknis:
                </span>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-center text-slate-400 italic">
                  - (Dalam Proses Pengisian)
                </div>
              </div>
            </div>

            {/* Kasi 3: Ketentraman, Ketertiban dan Linmas */}
            <div className="natural-card p-6 bg-white border-2 border-slate-200 hover:border-amber-500 transition-all space-y-4 shadow-md flex flex-col justify-between group rounded-3xl">
              <div className="space-y-3 text-center">
                <MaleSilhouette color="gold" />
                <div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wider">
                    Kasi Trantib & Linmas
                  </span>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mt-2 leading-snug">
                    SALMAN AL FARISHI, ST
                  </h4>
                  <p className="text-[11px] font-mono font-semibold text-amber-800 mt-0.5">
                    NIP. 199504022019021004
                  </p>
                </div>
              </div>

              {/* Pelaksana */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                  Pelaksana Teknis:
                </span>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-center text-slate-400 italic">
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
