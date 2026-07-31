import Image from 'next/image';
import { UserRound, UsersRound } from 'lucide-react';

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
    teks: 'text-emerald-700',
    titik: 'bg-emerald-500',
    halo: 'bg-emerald-100/80',
    garis: 'bg-emerald-300',
  },
  blue: {
    teks: 'text-blue-700',
    titik: 'bg-blue-500',
    halo: 'bg-blue-100/80',
    garis: 'bg-blue-300',
  },
  violet: {
    teks: 'text-violet-700',
    titik: 'bg-violet-500',
    halo: 'bg-violet-100/80',
    garis: 'bg-violet-300',
  },
  amber: {
    teks: 'text-amber-700',
    titik: 'bg-amber-500',
    halo: 'bg-amber-100/80',
    garis: 'bg-amber-300',
  },
};

const ukuranPotret = {
  utama: {
    wadah: 'h-52 w-48',
    halo: 'bottom-1 left-3 right-3 h-40',
    sizes: '192px',
    ikon: 'h-24 w-24',
  },
  sedang: {
    wadah: 'h-44 w-40',
    halo: 'bottom-1 left-3 right-3 h-32',
    sizes: '160px',
    ikon: 'h-20 w-20',
  },
  kecil: {
    wadah: 'h-28 w-24',
    halo: 'bottom-0 left-1 right-1 h-20',
    sizes: '96px',
    ikon: 'h-12 w-12',
  },
};

function PotretTerbuka({ orang, ukuran = 'sedang', warna = 'emerald' }) {
  const dimensi = ukuranPotret[ukuran];
  const gaya = tema[warna];

  return (
    <div className={`relative shrink-0 ${dimensi.wadah}`}>
      <div className={`absolute rounded-[48%_48%_30%_30%] ${dimensi.halo} ${gaya.halo}`} />
      {orang.foto ? (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={orang.foto}
            alt={`Foto ${orang.nama}`}
            fill
            sizes={dimensi.sizes}
            className="object-cover object-top drop-shadow-[0_12px_12px_rgba(15,23,42,0.16)]"
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
          <UserRound className={dimensi.ikon} strokeWidth={1.15} aria-hidden="true" />
          <span className="sr-only">Foto belum tersedia</span>
        </div>
      )}
    </div>
  );
}

function LabelJabatan({ children, warna = 'emerald' }) {
  const gaya = tema[warna];

  return (
    <div className="flex items-center justify-center gap-2">
      <span className={`h-1.5 w-1.5 rounded-full ${gaya.titik}`} />
      <span className={`text-[10px] font-extrabold uppercase tracking-[0.2em] ${gaya.teks}`}>
        {children}
      </span>
      <span className={`h-1.5 w-1.5 rounded-full ${gaya.titik}`} />
    </div>
  );
}

function Pimpinan({ orang, utama = false }) {
  return (
    <article className="flex flex-col items-center text-center">
      <PotretTerbuka orang={orang} ukuran={utama ? 'utama' : 'sedang'} warna={utama ? 'emerald' : 'blue'} />
      <div className={utama ? '-mt-1' : '-mt-0.5'}>
        <LabelJabatan warna={utama ? 'emerald' : 'blue'}>{orang.jabatan}</LabelJabatan>
        <h3 className={`mt-2 font-extrabold tracking-tight text-slate-900 ${utama ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
          {orang.nama}
        </h3>
        <p className="mt-1 text-xs text-slate-500">Kelurahan Mesjid Priyayi</p>
      </div>
    </article>
  );
}

function Operator({ orang, warna }) {
  const gaya = tema[warna];

  return (
    <div className="flex flex-col items-center text-center">
      <PotretTerbuka orang={orang} ukuran="kecil" warna={warna} />
      <span className="-mt-0.5 text-[9px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
        {orang.jabatan}
      </span>
      <h4 className="mt-1 text-sm font-bold text-slate-800">{orang.nama}</h4>
      <span className={`mt-2 h-1 w-8 rounded-full ${gaya.titik}`} />
    </div>
  );
}

function CabangOrganisasi({ unit }) {
  const gaya = tema[unit.warna];

  return (
    <article className="relative flex flex-col items-center px-2 text-center">
      <div className="mx-auto h-7 w-px bg-slate-300 lg:hidden" />
      <PotretTerbuka orang={unit} warna={unit.warna} />
      <div className="-mt-0.5 min-h-24">
        <LabelJabatan warna={unit.warna}>{unit.jabatan}</LabelJabatan>
        <h3 className={`mx-auto mt-2 max-w-60 text-sm font-extrabold leading-5 ${unit.foto ? 'text-slate-900' : 'italic text-slate-500'}`}>
          {unit.nama}
        </h3>
      </div>

      {unit.operator && (
        <>
          <div className={`h-8 w-px ${gaya.garis}`} />
          <Operator orang={unit.operator} warna={unit.warna} />
        </>
      )}
    </article>
  );
}

export default function StrukturOrganisasi() {
  return (
    <section id="struktur" className="relative overflow-hidden border-t border-slate-100 bg-white py-20 scroll-mt-20">
      <div className="pointer-events-none absolute left-1/2 top-40 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald-50/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-24 h-80 w-80 rounded-full bg-blue-50/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-24 h-80 w-80 rounded-full bg-amber-50/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Image src="/logo.jpeg" alt="Logo Kota Serang" width={48} height={48} className="mx-auto h-12 w-12 object-contain" />
          <div className="mt-5 section-label">Pemerintahan</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Struktur Organisasi
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Susunan aparatur Kelurahan Mesjid Priyayi, Kecamatan Kasemen, Kota Serang.
          </p>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col items-center">
          <Pimpinan orang={kepalaKelurahan} utama />
          <div className="my-5 h-12 w-px bg-gradient-to-b from-emerald-300 to-blue-300" />
          <Pimpinan orang={sekretarisKelurahan} />

          <div className="mt-5 h-12 w-px bg-slate-300" />
          <div className="hidden w-[75%] border-t border-slate-300 lg:block" />
          <div className="hidden w-[75%] grid-cols-4 lg:grid">
            {unitKerja.map((unit) => (
              <div key={unit.jabatan} className="mx-auto h-9 w-px bg-slate-300" />
            ))}
          </div>

          <div className="grid w-full grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
            {unitKerja.map((unit) => (
              <CabangOrganisasi key={unit.jabatan} unit={unit} />
            ))}
          </div>

          <div className="mt-14 flex max-w-lg items-start justify-center gap-2 text-center text-slate-400">
            <UsersRound className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p className="text-xs leading-5">
              Siluet digunakan sementara untuk jabatan atau aparatur yang fotonya belum tersedia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}