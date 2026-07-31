import Image from 'next/image';
import { Building2, UserRound, UsersRound } from 'lucide-react';

const kepalaKelurahan = {
  jabatan: 'Kepala Kelurahan',
  nama: 'H. Syarif, S.IP., M.Si.',
  foto: '/struktur/portraits/h-syarif.png',
};

const sekretarisKelurahan = {
  jabatan: 'Sekretaris Kelurahan',
  nama: 'Sety Puruhito, SE.',
  foto: '/struktur/portraits/sety-puruhito.png',
};

const unitKerja = [
  {
    jabatan: 'Kasi PMK',
    nama: 'Dedeh Rochmaedah, S.Kep., MM.',
    foto: '/struktur/portraits/dedeh-rochmaedah.png',
    warna: 'emerald',
    operator: {
      jabatan: 'Operator',
      nama: 'Bahrani',
      foto: '/struktur/portraits/bahrani.png',
    },
  },
  {
    jabatan: 'Kasi Trantib',
    nama: 'Salman Al Farishi, ST.',
    foto: '/struktur/portraits/salman-al-farishi.png',
    warna: 'blue',
    operator: {
      jabatan: 'Operator',
      nama: 'Ulfah',
      foto: '/struktur/portraits/ulfah.png',
    },
  },
  {
    jabatan: 'Kasi Pem',
    nama: 'Belum terisi',
    foto: null,
    warna: 'violet',
    operator: {
      jabatan: 'Operator',
      nama: 'Fikri FA',
      foto: '/struktur/portraits/fikri-fa.png',
    },
  },
  {
    jabatan: 'Pranata Kewilayahan',
    nama: 'Esti Hestiyanti',
    foto: null,
    warna: 'amber',
    operator: null,
  },
];

const tema = {
  emerald: {
    bar: 'bg-emerald-600',
    label: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    portrait: 'border-emerald-200 bg-emerald-50',
    connector: 'bg-emerald-300',
  },
  blue: {
    bar: 'bg-blue-600',
    label: 'border-blue-200 bg-blue-50 text-blue-700',
    portrait: 'border-blue-200 bg-blue-50',
    connector: 'bg-blue-300',
  },
  violet: {
    bar: 'bg-violet-600',
    label: 'border-violet-200 bg-violet-50 text-violet-700',
    portrait: 'border-violet-200 bg-violet-50',
    connector: 'bg-violet-300',
  },
  amber: {
    bar: 'bg-amber-500',
    label: 'border-amber-200 bg-amber-50 text-amber-700',
    portrait: 'border-amber-200 bg-amber-50',
    connector: 'bg-amber-300',
  },
};

function Siluet({ kecil = false }) {
  return (
    <div className={`flex h-full w-full items-center justify-center text-slate-400 ${kecil ? 'bg-slate-50' : 'bg-gradient-to-b from-slate-50 to-slate-100'}`}>
      <UserRound className={kecil ? 'h-9 w-9' : 'h-16 w-16'} strokeWidth={1.25} aria-hidden="true" />
      <span className="sr-only">Foto belum tersedia</span>
    </div>
  );
}

function Potret({ orang, ukuran = 'normal', className = '' }) {
  const dimensi = ukuran === 'besar' ? 'h-40 w-36 sm:h-44 sm:w-40' : ukuran === 'kecil' ? 'h-20 w-20' : 'h-32 w-32';

  return (
    <div className={`relative shrink-0 overflow-hidden ${dimensi} ${className}`}>
      {orang.foto ? (
        <Image
          src={orang.foto}
          alt={`Foto ${orang.nama}`}
          fill
          sizes={ukuran === 'besar' ? '(max-width: 640px) 144px, 160px' : ukuran === 'kecil' ? '80px' : '128px'}
          className="object-cover object-top"
        />
      ) : (
        <Siluet kecil={ukuran === 'kecil'} />
      )}
    </div>
  );
}

function KartuPimpinan({ orang, utama = false }) {
  return (
    <article className={`relative w-full overflow-hidden rounded-2xl border bg-white shadow-[0_12px_35px_rgba(15,23,42,0.08)] ${utama ? 'max-w-xl border-emerald-200' : 'max-w-lg border-slate-200'}`}>
      <div className={`absolute inset-y-0 left-0 w-1.5 ${utama ? 'bg-emerald-600' : 'bg-slate-700'}`} />
      <div className="flex min-h-44 items-stretch pl-1.5">
        <Potret
          orang={orang}
          ukuran="besar"
          className={utama ? 'bg-emerald-50' : 'bg-slate-100'}
        />
        <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-5 sm:px-7">
          <div className="mb-3 flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${utama ? 'bg-emerald-500' : 'bg-slate-500'}`} />
            <span className={`text-[10px] font-extrabold uppercase tracking-[0.18em] ${utama ? 'text-emerald-700' : 'text-slate-600'}`}>
              {orang.jabatan}
            </span>
          </div>
          <h3 className={`font-extrabold leading-tight tracking-tight text-slate-900 ${utama ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
            {orang.nama}
          </h3>
          <p className="mt-2 text-xs leading-5 text-slate-500">Kelurahan Mesjid Priyayi</p>
        </div>
      </div>
    </article>
  );
}

function KartuJabatan({ unit }) {
  const warna = tema[unit.warna];

  return (
    <article className="relative h-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_16px_36px_rgba(15,23,42,0.10)]">
      <div className={`h-1.5 w-full ${warna.bar}`} />
      <div className="flex h-[calc(100%-6px)] flex-col items-center px-4 pb-5 pt-5 text-center">
        <Potret orang={unit} className={`rounded-full border-4 ${warna.portrait}`} />
        <span className={`mt-4 inline-flex rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] ${warna.label}`}>
          {unit.jabatan}
        </span>
        <h3 className={`mt-3 max-w-full text-sm font-bold leading-5 ${unit.foto ? 'text-slate-900' : 'italic text-slate-500'}`}>
          {unit.nama}
        </h3>
      </div>
    </article>
  );
}

function KartuOperator({ operator, warna }) {
  const gaya = tema[warna];

  return (
    <article className="flex min-h-28 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_22px_rgba(15,23,42,0.05)]">
      <Potret orang={operator} ukuran="kecil" className={`rounded-xl border ${gaya.portrait}`} />
      <div className="min-w-0 text-left">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
          {operator.jabatan}
        </span>
        <h4 className="mt-1 truncate text-sm font-bold text-slate-800">{operator.nama}</h4>
      </div>
    </article>
  );
}

function CabangOrganisasi({ unit }) {
  const warna = tema[unit.warna];

  return (
    <div className="relative">
      <div className="mx-auto h-7 w-px bg-slate-300 lg:hidden" />
      <KartuJabatan unit={unit} />
      {unit.operator && (
        <>
          <div className={`mx-auto h-6 w-px ${warna.connector}`} />
          <KartuOperator operator={unit.operator} warna={unit.warna} />
        </>
      )}
    </div>
  );
}

export default function StrukturOrganisasi() {
  return (
    <section id="struktur" className="border-t border-slate-200 bg-[#f7f9fb] py-20 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200 bg-white shadow-sm">
            <Image src="/logo.jpeg" alt="Logo Kota Serang" width={38} height={38} className="h-10 w-10 object-contain" />
          </div>
          <div className="section-label">Pemerintahan</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Struktur Organisasi
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Susunan aparatur Kelurahan Mesjid Priyayi, Kecamatan Kasemen, Kota Serang.
          </p>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col items-center">
          <KartuPimpinan orang={kepalaKelurahan} utama />
          <div className="h-8 w-px bg-emerald-300" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm">
            <Building2 className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="h-8 w-px bg-slate-300" />
          <KartuPimpinan orang={sekretarisKelurahan} />

          <div className="h-10 w-px bg-slate-300" />
          <div className="hidden w-[75%] border-t-2 border-slate-200 lg:block" />
          <div className="hidden w-[75%] grid-cols-4 lg:grid">
            {unitKerja.map((unit) => (
              <div key={unit.jabatan} className="mx-auto h-8 w-px bg-slate-200" />
            ))}
          </div>

          <div className="grid w-full grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
            {unitKerja.map((unit) => (
              <CabangOrganisasi key={unit.jabatan} unit={unit} />
            ))}
          </div>

          <div className="mt-12 flex max-w-xl items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm">
            <UsersRound className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
            <p className="text-xs leading-5 text-slate-500">
              Siluet digunakan sementara untuk jabatan atau aparatur yang fotonya belum tersedia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}