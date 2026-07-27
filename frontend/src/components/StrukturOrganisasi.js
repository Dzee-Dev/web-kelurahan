'use client';

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
    },
    {
      jabatan: 'Kasi Pemberdayaan Masyarakat', nama: 'DEDEH ROCHMAEDAH, S.Kep, MM', nip: '198101262008012005',
      pelaksana: null,
    },
    {
      jabatan: 'Kasi Trantib & Linmas', nama: 'SALMAN AL FARISHI, ST', nip: '199504022019021004',
      pelaksana: null,
    },
  ];

  return (
    <section id="struktur" className="py-16 bg-gray-50 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Struktur Organisasi
          </h2>
          <p className="mt-2 text-gray-500 text-sm max-w-lg mx-auto">
            Susunan pejabat dan aparatur Kelurahan Mesjid Priyayi, Kecamatan Kasemen, Kota Serang.
          </p>
        </div>

        {/* Org Chart */}
        <div className="flex flex-col items-center space-y-0">
          
          {/* Lurah */}
          <div className="bg-white border-2 border-amber-500 rounded-lg px-8 py-5 text-center shadow-sm w-full max-w-sm">
            <div className="text-xs font-semibold text-amber-700 mb-1">{lurah.jabatan}</div>
            <div className="text-lg font-bold text-gray-900">{lurah.nama}</div>
            <div className="text-xs text-gray-500 mt-0.5">NIP. {lurah.nip}</div>
          </div>

          {/* Connector */}
          <div className="w-px h-8 bg-gray-300"></div>

          {/* Sekretaris */}
          <div className="bg-white border-2 border-blue-500 rounded-lg px-8 py-5 text-center shadow-sm w-full max-w-md">
            <div className="text-xs font-semibold text-blue-700 mb-1">{sekretaris.jabatan}</div>
            <div className="text-base font-bold text-gray-900">{sekretaris.nama}</div>
            <div className="text-xs text-gray-500 mt-0.5">NIP. {sekretaris.nip}</div>
            
            {/* Staff */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-400 mb-2">Pelaksana</div>
              <div className="flex flex-wrap justify-center gap-3">
                {sekretaris.staff.map((s, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-xs">
                    <span className="font-semibold text-gray-800">{s.nama}</span>
                    <span className="text-gray-500 ml-1">— {s.peran}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Connector to 3 branches */}
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="hidden md:block w-2/3 border-t-2 border-gray-300"></div>

          {/* 3 Kasi */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-0 md:-mt-px">
            {kasiList.map((kasi, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="hidden md:block w-px h-6 bg-gray-300"></div>
                <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 text-center shadow-sm w-full hover:border-gray-300 transition-colors">
                  <div className="text-xs font-semibold text-gray-600 mb-1">{kasi.jabatan}</div>
                  <div className="text-sm font-bold text-gray-900">{kasi.nama}</div>
                  <div className="text-xs text-gray-500 mt-0.5">NIP. {kasi.nip}</div>
                  
                  <div className="mt-3 pt-2.5 border-t border-gray-100">
                    <div className="text-xs text-gray-400 mb-1">Pelaksana</div>
                    {kasi.pelaksana ? (
                      <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-xs inline-block">
                        <span className="font-semibold text-gray-800">{kasi.pelaksana.nama}</span>
                        <span className="text-gray-500 ml-1">— {kasi.pelaksana.peran}</span>
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
