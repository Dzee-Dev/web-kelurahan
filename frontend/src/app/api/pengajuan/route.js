import { NextResponse } from 'next/server';
import supabase from '@/lib/backend/supabase';
import { generatePengajuanPdf } from '@/lib/backend/pdfService';

const LABEL_JENIS_SURAT = {
  sktm: 'Surat Keterangan Tidak Mampu (SKTM)',
  domisili: 'Surat Keterangan Domisili Tempat Tinggal',
  kematian: 'Surat Keterangan Kematian',
};

function buildWaMessage(data) {
  const lines = [];

  lines.push('📋 *PENGAJUAN SURAT KELURAHAN ONLINE*');
  lines.push('----------------------------------------');
  lines.push('');

  // Jenis Surat & ID
  lines.push(`📄 *Jenis Surat:* ${LABEL_JENIS_SURAT[data.jenis_surat] || data.jenis_surat}`);
  lines.push(`🔑 *Kode Tracking ID:* ${data.id}`);
  lines.push('');

  // Data Pemohon
  lines.push('👤 *DATA PEMOHON*');
  lines.push(`• Nama: ${data.nama_pemohon}`);
  lines.push(`• NIK: ${data.nik_pemohon}`);
  lines.push(`• No. HP: ${data.no_hp}`);
  lines.push(`• Alamat: ${data.alamat_lengkap}`);

  // Data Pribadi
  if (data.data_pribadi) {
    const dp = data.data_pribadi;
    if (dp.tempat_lahir) lines.push(`• TTL: ${dp.tempat_lahir}, ${dp.tanggal_lahir || '-'}`);
    if (dp.jenis_kelamin) lines.push(`• Kelamin: ${dp.jenis_kelamin}`);
    if (dp.agama) lines.push(`• Agama: ${dp.agama}`);
    if (dp.pekerjaan) lines.push(`• Pekerjaan: ${dp.pekerjaan}`);
  }
  lines.push('');

  // Data Tambahan per Jenis Surat
  if (data.data_tambahan) {
    const dt = data.data_tambahan;
    lines.push('📝 *RINCIAN KEPERLUAN*');

    switch (data.jenis_surat) {
      case 'sktm':
        if (dt.keperluan) lines.push(`• Keperluan: ${dt.keperluan}`);
        break;

      case 'domisili':
        if (dt.alamat_asal) lines.push(`• Alamat Asal (KTP): ${dt.alamat_asal}`);
        if (dt.alamat_domisili) lines.push(`• Alamat Domisili: ${dt.alamat_domisili}`);
        if (dt.keperluan) lines.push(`• Keperluan: ${dt.keperluan}`);
        break;

      case 'kematian':
        if (dt.nama_almarhum) lines.push(`• Nama Almarhum: ${dt.nama_almarhum}`);
        if (dt.nik_almarhum) lines.push(`• NIK Almarhum: ${dt.nik_almarhum}`);
        if (dt.tanggal_kematian) lines.push(`• Tgl Kematian: ${dt.tanggal_kematian}`);
        if (dt.tempat_meninggal) lines.push(`• Tempat Meninggal: ${dt.tempat_meninggal}`);
        if (dt.penyebab_kematian) lines.push(`• Penyebab: ${dt.penyebab_kematian}`);
        if (dt.hubungan_pemohon) lines.push(`• Hubungan Pemohon: ${dt.hubungan_pemohon}`);
        break;
    }
    lines.push('');
  }

  // Link Dokumen PDF & Attachments
  if (data.dokumen_urls && typeof data.dokumen_urls === 'object') {
    lines.push('📎 *BERKAS & BUKTI PDF RESMI*');

    if (data.dokumen_urls.pdf_bukti_pengajuan) {
      const pdfUrl = typeof data.dokumen_urls.pdf_bukti_pengajuan === 'string'
        ? data.dokumen_urls.pdf_bukti_pengajuan
        : data.dokumen_urls.pdf_bukti_pengajuan.url;
      lines.push(`📑 *Download PDF Bukti Tanda Terima:* ${pdfUrl}`);
    }

    const entries = Object.entries(data.dokumen_urls);
    for (const [fieldName, fileData] of entries) {
      if (fieldName === 'pdf_bukti_pengajuan') continue;
      const label = fieldName.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const url = typeof fileData === 'string' ? fileData : fileData.url;
      lines.push(`• Foto ${label}: ${url}`);
    }
    lines.push('');
  }

  lines.push('----------------------------------------');
  lines.push(`🕐 Diajukan pada: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB`);

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
