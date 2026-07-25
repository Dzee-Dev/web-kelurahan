import { NextResponse } from 'next/server';
import supabase from '@/lib/backend/supabase';
import { generatePengajuanPdf } from '@/lib/backend/pdfService';

const LABEL_JENIS_SURAT = {
  sktm: 'Surat Keterangan Tidak Mampu (SKTM)',
  domisili: 'Surat Keterangan Domisili Tempat Tinggal',
  kematian: 'Surat Keterangan Kematian',
};

function buildWaMessage(data) {
  const lines = [
    '📋 *PENGAJUAN SURAT KELURAHAN ONLINE*',
    '━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    `📄 *Jenis Surat:* ${LABEL_JENIS_SURAT[data.jenis_surat] || data.jenis_surat}`,
    `🔑 *Kode Tracking ID:* ${data.id}`,
    '',
    '👤 *DATA PEMOHON*',
    `• Nama: ${data.nama_pemohon}`,
    `• NIK: ${data.nik_pemohon}`,
    `• No. HP: ${data.no_hp}`,
    `• Alamat: ${data.alamat_lengkap}`,
    '',
  ];

  if (data.dokumen_urls?.pdf_bukti_pengajuan) {
    const pdfUrl = typeof data.dokumen_urls.pdf_bukti_pengajuan === 'string'
      ? data.dokumen_urls.pdf_bukti_pengajuan
      : data.dokumen_urls.pdf_bukti_pengajuan.url;
    lines.push(`📑 *PDF Bukti Pengajuan:* ${pdfUrl}`);
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push(`🕐 Diajukan: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB`);

  return lines.join('\n');
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const jenis_surat = formData.get('jenis_surat');
    const nama_pemohon = formData.get('nama_pemohon');
    const nik_pemohon = formData.get('nik_pemohon');
    const no_hp = formData.get('no_hp');
    const alamat_lengkap = formData.get('alamat_lengkap');
    const data_pribadi = JSON.parse(formData.get('data_pribadi') || '{}');
    const data_tambahan = JSON.parse(formData.get('data_tambahan') || '{}');

    // 1. Upload files to Supabase Storage
    const timestamp = Date.now();
    const folder = `${jenis_surat}/${nik_pemohon}_${timestamp}`;
    const dokumenUrls = {};

    for (const [key, value] of formData.entries()) {
      if (value && typeof value === 'object' && value.name && value.size > 0) {
        const fileExt = value.name.split('.').pop();
        const filePath = `${folder}/${key}_${timestamp}.${fileExt}`;
        const buffer = Buffer.from(await value.arrayBuffer());

        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from('dokumen-pengajuan')
          .upload(filePath, buffer, {
            contentType: value.type || 'application/octet-stream',
            upsert: true,
          });

        if (!uploadErr && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from('dokumen-pengajuan')
            .getPublicUrl(filePath);

          dokumenUrls[key] = {
            path: filePath,
            url: publicUrlData.publicUrl,
            originalName: value.name,
            size: value.size,
          };
        }
      }
    }

    // 2. Insert to Supabase DB
    const { data: pengajuan, error: dbErr } = await supabase
      .from('pengajuan_surat')
      .insert({
        jenis_surat,
        nama_pemohon,
        nik_pemohon,
        no_hp,
        alamat_lengkap,
        data_pribadi,
        data_tambahan,
        dokumen_urls: dokumenUrls,
        status: 'pending',
      })
      .select()
      .single();

    if (dbErr) throw dbErr;

    // 3. Generate PDF
    let pdfUrl = null;
    try {
      const pdfBuffer = await generatePengajuanPdf(pengajuan);
      const pdfPath = `${jenis_surat}/bukti_pengajuan_${pengajuan.id}.pdf`;

      const { data: pdfUpload, error: pdfErr } = await supabase.storage
        .from('dokumen-pengajuan')
        .upload(pdfPath, pdfBuffer, {
          contentType: 'application/pdf',
          upsert: true,
        });

      if (!pdfErr && pdfUpload) {
        const { data: publicUrlData } = supabase.storage
          .from('dokumen-pengajuan')
          .getPublicUrl(pdfPath);
        pdfUrl = publicUrlData.publicUrl;

        dokumenUrls.pdf_bukti_pengajuan = {
          url: pdfUrl,
          originalName: `Bukti_Pengajuan_${jenis_surat.toUpperCase()}_${nik_pemohon}.pdf`,
        };

        await supabase
          .from('pengajuan_surat')
          .update({ dokumen_urls: dokumenUrls })
          .eq('id', pengajuan.id);
      }
    } catch (e) {
      console.error('PDF error:', e);
    }

    pengajuan.dokumen_urls = dokumenUrls;
    const waMsg = buildWaMessage(pengajuan);
    const adminPhone = process.env.WABA_ADMIN_PHONE || '6285694083400';
    const waDeepLink = `https://wa.me/${adminPhone}?text=${encodeURIComponent(waMsg)}`;

    return NextResponse.json({
      success: true,
      message: `Pengajuan ${LABEL_JENIS_SURAT[jenis_surat]} berhasil disubmit`,
      data: {
        id: pengajuan.id,
        jenis_surat: pengajuan.jenis_surat,
        nama_pemohon: pengajuan.nama_pemohon,
        status: pengajuan.status,
        created_at: pengajuan.created_at,
        pdf_url: pdfUrl,
        wa_deep_link: waDeepLink,
      },
    });
  } catch (err) {
    console.error('Submit API error:', err);
    return NextResponse.json(
      { success: false, error: { message: err.message || 'Internal Server Error' } },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: { message: 'ID diperlukan' } }, { status: 400 });
    }

    const { data: pengajuan, error } = await supabase
      .from('pengajuan_surat')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !pengajuan) {
      return NextResponse.json({ success: false, error: { message: 'Pengajuan tidak ditemukan' } }, { status: 404 });
    }

    const pdfUrl = pengajuan.dokumen_urls?.pdf_bukti_pengajuan?.url || null;

    return NextResponse.json({
      success: true,
      data: {
        id: pengajuan.id,
        jenis_surat: pengajuan.jenis_surat,
        jenis_surat_label: LABEL_JENIS_SURAT[pengajuan.jenis_surat],
        nama_pemohon: pengajuan.nama_pemohon,
        status: pengajuan.status,
        created_at: pengajuan.created_at,
        pdf_url: pdfUrl,
        dokumen_urls: pengajuan.dokumen_urls,
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: { message: err.message } }, { status: 500 });
  }
}
