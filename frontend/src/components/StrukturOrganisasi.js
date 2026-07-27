'use client';

/* ── SVG Person Silhouette Avatar ── */
function PersonAvatar({ size = 64, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <circle cx="32" cy="32" r="31" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
      {/* Head */}
      <circle cx="32" cy="24" r="9" fill="#9ca3af" />
      {/* Shoulders/Body */}
      <path d="M14 52c0-10 8-16 18-16s18 6 18 16" fill="#9ca3af" />
    </svg>
  );
}

function PersonAvatarAccent({ size = 64, accentColor = '#1e3a5f', bgColor = '#eef4fb' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="31" fill={bgColor} stroke={accentColor} strokeWidth="2" />
      <circle cx="32" cy="24" r="9" fill={accentColor} opacity="0.7" />
      <path d="M14 52c0-10 8-16 18-16s18 6 18 16" fill={accentColor} opacity="0.7" />
    </svg>
  );
}

export default function StrukturOrganisasi() {
  const lurah = { jabatan: 'Kepala Kelurahan', nama: 'H. SYARIF, S.Ip M.Si', nip: '197108112008011003' };
  const sekretaris = {
    jabatan: 'Sekretaris Kelurahan', nama: 'SETYO PURUHITO, SE', nip: '197512182014101001',
    staff: [
      { nama: 'FIKRI FAUZI', peran: 'Staff Pelaksana Umum' },
      { nama: 'ULFAH', peran: 'Pramubakti' },
    ],
  };
  const kasiList = [
    {
      jabatan: 'Kasi Pemerintahan', nama: 'RHIKE NURHAIDA, SE M.Si', nip: '198409062010012005',
      pelaksana: { nama: 'BAHRANI', peran: 'Operator Lampid' },
      color: '#15803d', bg: '#f0fdf4',
    },
    {
      jabatan: 'Kasi Pemberdayaan Masyarakat', nama: 'DEDEH ROCHMAEDAH, S.Kep, MM', nip: '198101262008012005',
      pelaksana: null,
      color: '#1d4ed8', bg: '#eff6ff',
    },
    {
      jabatan: 'Kasi Trantib & Linmas', nama: 'SALMAN AL FARISHI, ST', nip: '199504022019021004',
      pelaksana: null,
      color: '#b45309', bg: '#fffbeb',
    },
  ];

  return (
    <section id="struktur" className="py-16 bg-white border-t border-gray-200 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Title */}
        <div className="text-center mb-14">
          <div className="section-label">Pemerintahan</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Struktur Organisasi
          </h2>
          <p className="mt-2 text-gray-500 text-sm max-w-lg mx-auto">
            Susunan pejabat dan aparatur Kelurahan Mesjid Priyayi, Kecamatan Kasemen, Kota Serang.
          </p>
        </div>

        {/* Org Chart */}
        <div className="flex flex-col items-center">
          
          {/* ── LURAH ── */}
          <div className="card border-2 border-amber-400 px-8 py-6 text-center w-full max-w-sm">
            <div className="flex justify-center mb-3">
              <PersonAvatarAccent size={72} accentColor="#b45309" bgColor="#fef3c7" />
            </div>
            <div className="text-xs font-semibold text-amber-700 mb-1">{lurah.jabatan}</div>
            <div className="text-lg font-bold text-gray-900">{lurah.nama}</div>
            <div className="text-xs text-gray-400 font-mono mt-1">NIP. {lurah.nip}</div>
          </div>

          {/* Connector */}
          <div className="w-px h-10 bg-gray-300" />

          {/* ── SEKRETARIS ── */}
          <div className="card border-2 border-blue-400 px-8 py-6 text-center w-full max-w-md">
            <div className="flex justify-center mb-3">
              <PersonAvatarAccent size={64} accentColor="#1d4ed8" bgColor="#dbeafe" />
            </div>
            <div className="text-xs font-semibold text-blue-700 mb-1">{sekretaris.jabatan}</div>
            <div className="text-base font-bold text-gray-900">{sekretaris.nama}</div>
            <div className="text-xs text-gray-400 font-mono mt-1">NIP. {sekretaris.nip}</div>
            
            {/* Staff */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-400 mb-2.5">Pelaksana</div>
              <div className="flex flex-wrap justify-center gap-3">
                {sekretaris.staff.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                    <PersonAvatar size={28} />
                    <div className="text-left">
                      <div className="text-xs font-semibold text-gray-800">{s.nama}</div>
                      <div className="text-[11px] text-gray-500">{s.peran}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Connector to branches */}
          <div className="w-px h-8 bg-gray-300" />
          
          {/* Horizontal line for desktop */}
          <div className="hidden md:block relative w-full max-w-4xl">
            <div className="border-t-2 border-gray-200 mx-auto" style={{ width: '66%' }} />
            <div className="flex justify-between mx-auto" style={{ width: '66%' }}>
              <div className="w-px h-8 bg-gray-200" />
              <div className="w-px h-8 bg-gray-200" />
              <div className="w-px h-8 bg-gray-200" />
            </div>
          </div>

          {/* ── 3 KASI ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {kasiList.map((kasi, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Mobile connector */}
                <div className="md:hidden w-px h-6 bg-gray-200 mb-0" />
                
                <div className="card px-5 py-5 text-center w-full hover:border-gray-300">
                  <div className="flex justify-center mb-3">
                    <PersonAvatarAccent size={56} accentColor={kasi.color} bgColor={kasi.bg} />
                  </div>
                  <div className="text-xs font-semibold mb-1" style={{ color: kasi.color }}>{kasi.jabatan}</div>
                  <div className="text-sm font-bold text-gray-900">{kasi.nama}</div>
                  <div className="text-xs text-gray-400 font-mono mt-1">NIP. {kasi.nip}</div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-400 mb-1.5">Pelaksana</div>
                    {kasi.pelaksana ? (
                      <div className="flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 inline-flex">
                        <PersonAvatar size={24} />
                        <div className="text-left">
                          <div className="text-xs font-semibold text-gray-800">{kasi.pelaksana.nama}</div>
                          <div className="text-[11px] text-gray-500">{kasi.pelaksana.peran}</div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Belum terisi</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
