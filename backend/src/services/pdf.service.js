const PDFDocument = require('pdfkit');
const { LABEL_JENIS_SURAT } = require('../config/constants');

/**
 * Generate PDF Bukti Pengajuan Surat
 * @param {Object} data - Data pengajuan dari database
 * @returns {Promise<Buffer>} - Buffer file PDF
 */
function generatePengajuanPdf(data) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: 'A4' });
      const buffers = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      const labelSurat = LABEL_JENIS_SURAT[data.jenis_surat] || data.jenis_surat;

      // ─── KOP SURAT RESMI KELURAHAN ─────────────────────────────
      doc
        .font('Helvetica-Bold')
        .fontSize(12)
        .text('PEMERINTAH KOTA SERANG', { align: 'center' })
        .fontSize(14)
        .text('KECAMATAN KASEMEN', { align: 'center' })
        .fontSize(16)
        .text('KELURAHAN MESJID PRIYAYI', { align: 'center' })
        .font('Helvetica')
        .fontSize(9)
        .text('Jl. Mesjid Priyayi No. 75 Kasemen 42191 Serang-Banten | Email: mesjidpriyayikelurahan@gmail.com', { align: 'center' });

      // Garis Ganda Kop Surat
      doc.moveDown(0.5);
      const yHeader = doc.y;
      doc.lineWidth(2).moveTo(40, yHeader).lineTo(555, yHeader).stroke();
      doc.lineWidth(0.5).moveTo(40, yHeader + 3).lineTo(555, yHeader + 3).stroke();
      doc.moveDown(1.5);

      // ─── JUDUL DOKUMEN ──────────────────────────────────────────
      doc
        .font('Helvetica-Bold')
        .fontSize(13)
        .fillColor('#059669')
        .text('BUKTI TANDA TERIMA PENGAJUAN SURAT ONLINE', { align: 'center', underline: true })
        .moveDown(0.2)
        .font('Helvetica-Oblique')
        .fontSize(9)
        .fillColor('#475569')
        .text(`Kode Tracking ID: ${data.id}`, { align: 'center' })
        .moveDown(1.5);

      doc.fillColor('#0f172a'); // reset color

      // ─── INFORMASI SURAT ────────────────────────────────────────
      doc
        .font('Helvetica-Bold')
        .fontSize(10)
        .text('JENIS PENGAJUAN SURAT:', 40)
        .font('Helvetica')
        .fontSize(11)
        .fillColor('#047857')
        .text(labelSurat.toUpperCase(), 40)
        .moveDown(1);

      doc.fillColor('#0f172a');

      // ─── DATA PEMOHON ───────────────────────────────────────────
      doc.font('Helvetica-Bold').fontSize(10).text('I. DATA DIRI PEMOHON', 40);
      doc.moveDown(0.3);

      const renderRow = (label, value) => {
        const y = doc.y;
        doc.font('Helvetica-Bold').fontSize(9).text(label, 50, y, { width: 150 });
        doc.font('Helvetica').fontSize(9).text(`:  ${value || '-'}`, 200, y, { width: 340 });
        doc.moveDown(0.4);
      };

      renderRow('Nama Lengkap', data.nama_pemohon);
      renderRow('NIK', data.nik_pemohon);
      renderRow('No. WhatsApp / HP', data.no_hp);
      renderRow('Alamat Lengkap', data.alamat_lengkap);

      if (data.data_pribadi) {
        const dp = data.data_pribadi;
        renderRow('Tempat, Tgl Lahir', `${dp.tempat_lahir || '-'}, ${dp.tanggal_lahir || '-'}`);
        renderRow('Jenis Kelamin', dp.jenis_kelamin ? dp.jenis_kelamin.toUpperCase() : '-');
        renderRow('Agama', dp.agama);
        renderRow('Pekerjaan', dp.pekerjaan);
      }

      doc.moveDown(1);

      // ─── DETAIL KEPERLUAN ───────────────────────────────────────
      doc.font('Helvetica-Bold').fontSize(10).text('II. DETAIL KEPERLUAN SURAT', 40);
      doc.moveDown(0.3);

      if (data.data_tambahan) {
        const dt = data.data_tambahan;
        if (data.jenis_surat === 'sktm') {
          renderRow('Keperluan SKTM', dt.keperluan);
        } else if (data.jenis_surat === 'domisili') {
          renderRow('Alamat Asal (KTP)', dt.alamat_asal);
          renderRow('Alamat Domisili', dt.alamat_domisili);
          renderRow('Keperluan Domisili', dt.keperluan);
        } else if (data.jenis_surat === 'kematian') {
          renderRow('Nama Almarhum/ah', dt.nama_almarhum);
          renderRow('NIK Almarhum/ah', dt.nik_almarhum);
          renderRow('Tanggal Kematian', dt.tanggal_kematian);
          renderRow('Tempat Meninggal', dt.tempat_meninggal);
          renderRow('Penyebab Kematian', dt.penyebab_kematian);
          renderRow('Hubungan Pemohon', dt.hubungan_pemohon);
        }
      }

      doc.moveDown(1);

      // ─── CHECKLIST DOKUMEN TERLAMPIR ────────────────────────────
      doc.font('Helvetica-Bold').fontSize(10).text('III. STATUS LAMPIRAN DOKUMEN FOTO/PDF', 40);
      doc.moveDown(0.3);

      if (data.dokumen_urls && typeof data.dokumen_urls === 'object') {
        const entries = Object.entries(data.dokumen_urls);
        entries.forEach(([key, val]) => {
          if (key === 'pdf_bukti_pengajuan') return; // Skip self reference
          const label = key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
          doc.font('Helvetica').fontSize(8.5).text(`[V] Dokumen ${label} : TER-UPLOAD (Tervalidasi System)`, 50);
          doc.moveDown(0.3);
        });
      }

      doc.moveDown(1.5);

      // ─── TANDA TANGAN & CATATAN ─────────────────────────────────
      const ySign = doc.y;
      
      // Box Catatan
      doc
        .fontSize(8)
        .fillColor('#475569')
        .text('Catatan Resmi:', 40, ySign)
        .text('1. Bukti pengajuan ini sah diterbitkan oleh sistem Web Kelurahan Digital.', 40, ySign + 12)
        .text('2. Silakan konfirmasikan bukti pengajuan ini ke WhatsApp Admin Kelurahan.', 40, ySign + 24)
        .text('3. Bawalah KTP Asli saat pengambilan fisik surat di Kantor Kelurahan.', 40, ySign + 36);

      // Area Tanda Tangan
      const dateStr = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Jakarta',
      });

      doc
        .fillColor('#0f172a')
        .font('Helvetica')
        .fontSize(9)
        .text(`Kelurahan Digital, ${dateStr}`, 370, ySign, { align: 'center', width: 170 })
        .text('Petugas Verifikator / Admin', 370, ySign + 12, { align: 'center', width: 170 })
        .moveDown(3)
        .font('Helvetica-Bold')
        .text('( SYSTEM VERIFIED )', 370, ySign + 55, { align: 'center', width: 170 })
        .font('Helvetica')
        .fontSize(8)
        .text('NIP. 19850101 201001 1 001', 370, ySign + 68, { align: 'center', width: 170 });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generatePengajuanPdf };
