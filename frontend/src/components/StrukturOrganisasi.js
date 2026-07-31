import Image from 'next/image';
import { Building2, UserRound } from 'lucide-react';

const pimpinan = {
  jabatan: 'Kepala Kelurahan',
  nama: 'H. Syarif, S.IP., M.Si.',
  foto: '/struktur/portraits/h-syarif.png',
};

const sekretaris = {
  jabatan: 'Sekretaris Kelurahan',
  nama: 'Sety Puruhito, SE.',
  foto: '/struktur/portraits/sety-puruhito.png',
};

const bidang = [
  {
    jabatan: 'Kasi PMK',
    nama: 'Dedeh Rochmaedah, S.Kep., MM.',
    foto: '/struktur/portraits/dedeh-rochmaedah.png',
    aksen: 'emerald',
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
    aksen: 'blue',
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
    aksen: 'violet',
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
    aksen: 'amber',
    operator: null,
  },
];

const tema = {
  emerald: {
    ring: 'ring-emerald-200',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    glow: 'from-emerald-100/90 to-teal-50/20',
    line: 'bg-emerald-300',
  },
  blue: {
    ring: 'ring-blue-200',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    glow: 'from-blue-100/90 to-cyan-50/20',
    line: 'bg-blue-300',
  },
  violet: {
    ring: 'ring-violet-200',
    badge: 'bg-violet-50 text-violet-700 border-violet-200',
    glow: 'from-violet-100/90 to-fuchsia-50/20',
    line: 'bg-violet-300',
  },
  amber: {
    ring: 'ring-amber-200',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    glow: 'from-amber-100/90 to-orange-50/20',
    line: 'bg-amber-300',
  },
};

function Siluet({ compact = false }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full border border-dashed border-slate-300 bg-slate-50/70 text-slate-400 ${compact ? 'h-24 w-24' : 'h-36 w-36'}`}
      aria-label="Foto belum tersedia"
    >
      <UserRound className={compact ? 'h-12 w-12' : 'h-20 w-20'} strokeWidth={1.2} />
    </div>
  );
}

function FotoPejabat({ orang, compact = false, utama = false }) {
  const ukuran = compact ? 'h-28 w-28' : utama ? 'h-52 w-52' : 'h-40 w-40';

  if (!orang.foto) {
    return <Siluet compact={compact} />;
  }

  return (
    <div className={`relative ${ukuran}`}>
      <Image
        src={orang.foto}
        alt={`Foto ${orang.nama}`}
        fill
        sizes={compact ? '112px' : utama ? '208px' : '160px'}
        className="object-contain object-bottom drop-shadow-[0_14px_18px_rgba(15,23,42,0.16)]"
      />
    </div>
  );
}

function KartuUtama({ orang, jenis }) {
  const isLurah = jenis === 'lurah';

  return (
    <article className={`relative overflow-hidden rounded-3xl border bg-white text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${isLurah ? 'w-full max-w-md border-amber-200' : 'w-full max-w-sm border-blue-200'}`}>
      <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${isLurah ? 'from-amber-100/80' : 'from-blue-100/80'} to-transparent`} />
      <div className="relative flex flex-col items-center px-6 pt-6">
        <FotoPejabat orang={orang} utama={isLurah} />
      </div>
      <div className="relative border-t border-slate-100 px-6 py-5">
        <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ${isLurah ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-blue-200 bg-blue-50 text-blue-700'}`}>
          {orang.jabatan}
        </span>
        <h3 className="mt-3 text-lg font-extrabold tracking-tight text-slate-900">{orang.nama}</h3>
      </div>
    </article>
  );
}

function KartuBidang({ data }) {
  const warna = tema[data.aksen];

  return (
    <div className="flex h-full flex-col items-center">
      <article className="relative flex w-full flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.07)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.11)]">
        <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${warna.glow}`} />
        <div className="relative flex min-h-48 items-end justify-center px-4 pt-5">
          <div className={`rounded-full ring-4 ${warna.ring} ring-offset-4 ring-offset-white`}>
            <FotoPejabat orang={data} />
          </div>
        </div>
        <div className="relative mt-5 flex flex-1 flex-col items-center border-t border-slate-100 px-4 py-5 text-center">
          <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${warna.badge}`}>
            {data.jabatan}
          </span>
          <h3 className={`mt-3 text-sm font-extrabold leading-snug ${data.foto ? 'text-slate-900' : 'italic text-slate-500'}`}>
            {data.nama}
          </h3>
        </div>
      </article>

      {data.operator && (
        <>
          <div className={`h-7 w-px ${warna.line}`} />
          <article className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-4 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <FotoPejabat orang={data.operator} compact />
              <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                {data.operator.jabatan}
              </span>
              <h4 className="mt-1 text-sm font-bold text-slate-800">{data.operator.nama}</h4>
            </div>
          </article>
        </>
      )}
    </div>
  );
}

export default function StrukturOrganisasi() {
  return (
    <section id="struktur" className="relative overflow-hidden border-t border-slate-200 bg-slate-50 py-20 scroll-mt-20">
      <div className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="section-label">Pemerintahan</div>
          <div className="mt-3 flex items-center justify-center gap-2 text-slate-400">
            <span className="h-px w-10 bg-slate-300" />
            <Building2 className="h-5 w-5" />
            <span className="h-px w-10 bg-slate-300" />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Struktur Organisasi
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Susunan aparatur Kelurahan Mesjid Priyayi, Kecamatan Kasemen, Kota Serang.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <KartuUtama orang={pimpinan} jenis="lurah" />
          <div className="h-10 w-px bg-gradient-to-b from-amber-300 to-blue-300" />
          <KartuUtama orang={sekretaris} jenis="sekretaris" />

          <div className="h-10 w-px bg-slate-300" />
          <div className="hidden w-[76%] border-t-2 border-slate-200 lg:block" />
          <div className="hidden w-[76%] grid-cols-4 lg:grid">
            {bidang.map((item) => (
              <div key={item.jabatan} className="mx-auto h-8 w-px bg-slate-200" />
            ))}
          </div>

          <div className="grid w-full grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {bidang.map((item) => (
              <div key={item.jabatan} className="relative">
                <div className="mx-auto h-7 w-px bg-slate-200 lg:hidden" />
                <KartuBidang data={item} />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-slate-400">
          Siluet menandai posisi yang fotonya belum tersedia atau jabatannya belum terisi.
        </p>
      </div>
    </section>
  );
}