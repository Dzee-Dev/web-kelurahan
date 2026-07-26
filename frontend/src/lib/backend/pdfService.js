const PDFDocument = require('pdfkit');

const LABEL_JENIS_SURAT = {
  sktm: 'SURAT KETERANGAN TIDAK MAMPU (SKTM)',
  domisili: 'SURAT KETERANGAN DOMISILI TEMPAT TINGGAL',
  kematian: 'SURAT KETERANGAN KEMATIAN',
};

async function generatePengajuanPdf(data) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: 'A4' });
      const buffers = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      // Header Banner
      doc
        .rect(40, 40, 515, 75)
        .fill('#0f172a');

      doc
        .fillColor('#fbbf24')
        .fontSize(11)
        .font('Helvetica-Bold')
        .text('PEMERINTAH KOTA SERANG - KECAMATAN KASEMEN', 55, 48, { align: 'left' });

      doc
        .fillColor('#ffffff')
        .fontSize(16)
        .font('Helvetica-Bold')
        .text('KELURAHAN MESJID PRIYAYI', 55, 63, { align: 'left' });

      doc
        .fontSize(8.5)
        .font('Helvetica')
        .fillColor('#cbd5e1')
        .text('Jl. Mesjid Priyayi No. 75, Kasemen 42191 Serang - Banten | Email: mesjidpriyayikelurahan@gmail.com', 55, 85, { align: 'left' });

      doc.moveDown(3);

      // Title
      doc
        .fillColor('#0f172a')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text(LABEL_JENIS_SURAT[data.jenis_surat] || 'SURAT KELURAHAN ONLINE', { align: 'center' });

      doc
        .fontSize(9)
        .font('Helvetica')
        .fillColor('#64748b')
        .text(`Kode Tracking ID: ${data.id}`, { align: 'center' });

      doc.moveDown(1.5);

      // Data Pemohon Box
      doc
        .fontSize(11)
        .font('Helvetica-Bold')
        .fillColor('#0f172a')
        .text('I. DATA PEMOHON');

      doc
        .rect(40, doc.y + 5, 515, 110)
        .fill('#f8fafc')
        .stroke('#e2e8f0');

      const startY = doc.y + 15;
      doc
        .fontSize(9)
        .font('Helvetica-Bold')
        .fillColor('#334155');

      doc.text('Nama Lengkap', 55, startY);
      doc.text('NIK Pemohon', 55, startY + 18);
      doc.text('No. WhatsApp', 55, startY + 36);
      doc.text('Alamat Pemohon', 55, startY + 54);

      doc.font('Helvetica').fillColor('#0f172a');
      doc.text(`: ${data.nama_pemohon}`, 160, startY);
      doc.text(`: ${data.nik_pemohon}`, 160, startY + 18);
      doc.text(`: ${data.no_hp}`, 160, startY + 36);
      doc.text(`: ${data.alamat_lengkap}`, 160, startY + 54, { width: 370 });

      doc.y = startY + 115;
      doc.moveDown(1);

      // Status Badge Box
      doc
        .fontSize(11)
        .font('Helvetica-Bold')
        .fillColor('#0f172a')
        .text('II. STATUS PENGAJUAN');

      doc
        .rect(40, doc.y + 5, 515, 45)
        .fill('#ecfdf5')
        .stroke('#a7f3d0');

      doc
        .fontSize(10)
        .font('Helvetica-Bold')
        .fillColor('#047857')
        .text('STATUS: TERDAFTAR / MENUNGGU VERIFIKASI PETUGAS', 55, doc.y + 20);

      doc.moveDown(4);

      // Catatan
      doc
        .fontSize(9)
        .font('Helvetica-Bold')
        .fillColor('#0f172a')
        .text('CATATAN PENTING FOR WARGA:');

      doc
        .fontSize(8)
        .font('Helvetica')
        .fillColor('#64748b')
        .text('1. Simpan dokumen PDF ini sebagai bukti pendaftaran resmi pelayanan surat kelurahan.');

      doc
        .text('2. Petugas kelurahan akan melakukan verifikasi keabsahan foto KTP/KK yang Anda unggah.');

      doc
        .text('3. Saat mengambil fisik surat di Kantor Kelurahan, harap membawa KTP asli pemohon.');

      // Footer
      doc
        .fontSize(8)
        .fillColor('#94a3b8')
        .text(`Dicetak secara otomatis pada: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB`, 40, 780, { align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generatePengajuanPdf };
