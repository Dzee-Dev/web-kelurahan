import { NextResponse } from 'next/server';

const KNOWLEDGE_BASE = [
  {
    keywords: ['sktm', 'tidak mampu', 'beasiswa', 'rumah sakit', 'bantuan'],
    answer: ' Syarat Pengajuan SKTM (Surat Keterangan Tidak Mampu):\n1. Surat Pengantar RT/RW\n2. KTP Pemohon (Asli & Foto)\n3. Kartu Keluarga (KK)\n\nSurat ini biasa digunakan untuk beasiswa sekolah/kuliah, bantuan sosial, atau keringanan biaya rawat inap Rumah Sakit.',
  },
  {
    keywords: ['domisili', 'tempat tinggal', 'pindah', 'sewa', 'kontrak'],
    answer: ' Syarat Surat Keterangan Domisili:\n1. Surat Pengantar RT/RW setempat\n2. KTP Pemohon\n3. Kartu Keluarga (KK)\n\nDigunakan untuk pendataan tempat tinggal sementara, syarat pendaftaran sekolah, atau pembukaan rekening bank.',
  },
  {
    keywords: ['kematian', 'meninggal', 'almarhum', 'meninggal dunia', 'akta kematian'],
    answer: ' Syarat Surat Pelaporan Kematian:\n1. Surat Pengantar RT/RW\n2. KTP Pemohon (Ahli Waris)\n3. KTP & KK Almarhum/Almarhumah\n4. Surat Keterangan Kematian dari Dokter/Rumah Sakit\n5. Fotokopi KTP 2 Orang Saksi',
  },
  {
    keywords: ['jam', 'buka', 'operasional', 'tutup', 'hari kerja', 'kantor'],
    answer: ' Jam Operasional Layanan Kantor Kelurahan:\n• Senin - Jumat: 08.00 - 15.00 WIB\n• Sabtu, Minggu & Hari Libur Nasional: TUTUP.\n\n*Catatan: Pengajuan online dapat dilakukan 24 jam nonstop!',
  },
];

export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message || !message.trim()) {
      return NextResponse.json({ success: false, error: 'Pesan tidak boleh kosong' }, { status: 400 });
    }

    const lowerMsg = message.toLowerCase();
    let reply = null;

    for (const kb of KNOWLEDGE_BASE) {
      if (kb.keywords.some((kw) => lowerMsg.includes(kw))) {
        reply = kb.answer;
        break;
      }
    }

    if (!reply) {
      reply = `Halo! 👋 Untuk pengajuan surat di Kelurahan Digital, Anda bisa mengajukan:\n1. SKTM (Surat Keterangan Tidak Mampu)\n2. Surat Domisili\n3. Surat Kematian\n\nSilakan pilih menu pengajuan di halaman utama atau tanyakan syarat surat yang ingin Anda buat. Jam layanan kantor: Senin-Jumat 08.00-15.00 WIB.`;
    }

    return NextResponse.json({
      success: true,
      data: { reply },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
