const axios = require('axios');
const { JAM_OPERASIONAL, LABEL_JENIS_SURAT } = require('../config/constants');

/**
 * Knowledge Base lokal untuk informasi dasar kelurahan
 */
const KNOWLEDGE_BASE = {
  sktm: `*Surat Keterangan Tidak Mampu (SKTM)*
📌 *Persyaratan Dokumen:*
1. Surat Pengantar RT/RW (Asli/Foto)
2. KTP Pemohon (Foto)
3. Kartu Keluarga / KK (Foto)

💡 *Keperluan:* Beasiswa sekolah/kuliah, Keringanan biaya Rumah Sakit, Bantuan Sosial.`,

  domisili: `*Surat Keterangan Domisili*
📌 *Persyaratan Dokumen:*
1. Surat Pengantar RT/RW
2. KTP Pemohon
3. Kartu Keluarga (KK)

💡 *Keperluan:* Syarat melamar kerja, pendaftaran sekolah, syarat perbankan/pinjaman.`,

  kematian: `*Surat Keterangan Kematian*
📌 *Persyaratan Dokumen:*
1. Surat Pengantar RT/RW
2. KTP Pemohon
3. KTP Almarhum/ah & Kartu Keluarga Almarhum/ah
4. Surat Kematian Asli dari RS / Dokter
5. KTP Saksi 1 & KTP Saksi 2
6. Akta Kelahiran Almarhum/ah (Opsional)

💡 *Keperluan:* Pengurusan Akta Kematian Dukcapil, Klaim Asuransi/BPJS, Penetapan Ahli Waris.`,

  jamOperasional: `⏰ *Jam Operasional Kantor Kelurahan:*
- Senin - Jumat: 08:00 - 15:00 WIB
- Sabtu, Minggu & Hari Libur Nasional: TUTUP

*Catatan:* Pengisian formulir online di website dapat dilakukan 24 jam nonstop. Verifikasi dan pemrosesan berkas dilakukan saat jam kerja kantor.`,

  trackingInfo: `🔍 *Cara Cek Status Pengajuan:*
1. Buka menu "Tracking Status" di website kelurahan.
2. Masukkan Kode Tracking UUID (contoh: 550e8400-e29b-41d4...).
3. Sistem akan menampilkan status terkini pengajuan Anda (Pending / Diproses / Selesai).`,
};

/**
 * Prompt Sistem untuk kecerdasan Bot AI Kelurahan
 */
const SYSTEM_PROMPT = `Anda adalah "Asisten AI Kelurahan Digital", layanan bot customer service pintar kantor kelurahan.
Tugas Anda adalah membantu warga menjawab pertanyaan seputar pengajuan surat (SKTM, Surat Domisili, Surat Kematian), persyaratannya, jam buka kelurahan, dan cara penggunaan website.

Aturan Respon:
1. Gunakan Bahasa Indonesia yang ramah, sopan, jelas, dan helpful.
2. Gunakan emoji secara proporsional agar mudah dibaca oleh warga.
3. Jam kerja kelurahan: Senin-Jumat 08:00 - 15:00 WIB.
4. Tiga jenis surat yang bisa diajukan: SKTM, Domisili, Kematian.
5. Jika warga menanyakan hal yang tidak relevan dengan kelurahan, tanggapi dengan sopan dan arahkan kembali ke layanan kelurahan.`;

/**
 * Generate respons AI pintar
 * @param {string} userMessage - Pesan dari warga
 * @returns {Promise<string>}
 */
async function generateAiResponse(userMessage) {
  const apiKey = process.env.GEMINI_API_KEY;
  const msgLower = (userMessage || '').toLowerCase();

  // 1. Jika GEMINI_API_KEY tersedia, gunakan Gemini API
  if (apiKey) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              role: 'user',
              parts: [
                { text: `${SYSTEM_PROMPT}\n\nPertanyaan Warga: "${userMessage}"` },
              ],
            },
          ],
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiText) return aiText;
    } catch (err) {
      console.warn('⚠️ Gemini API error, using smart fallback KB:', err.message);
    }
  }

  // 2. Smart Fallback Knowledge Engine (jika tanpa API Key)
  if (msgLower.includes('sktm') || msgLower.includes('tidak mampu') || msgLower.includes('beasiswa')) {
    return `Halo! Untuk pengajuan **Surat Keterangan Tidak Mampu (SKTM)**, berikut informasinya:\n\n${KNOWLEDGE_BASE.sktm}\n\nAnda dapat langsung mengisi formnya melalui menu **Layanan Surat > SKTM** di website ini.`;
  }

  if (msgLower.includes('domisili') || msgLower.includes('pindah') || msgLower.includes('tinggal')) {
    return `Halo! Untuk pengajuan **Surat Keterangan Domisili**, berikut informasinya:\n\n${KNOWLEDGE_BASE.domisili}\n\nSilakan ajukan secara online melalui menu **Layanan Surat > Surat Domisili**.`;
  }

  if (msgLower.includes('mati') || msgLower.includes('kematian') || msgLower.includes('almarhum') || msgLower.includes('meninggal')) {
    return `Halo! Untuk pelaporan **Surat Keterangan Kematian**, berikut persyaratannya:\n\n${KNOWLEDGE_BASE.kematian}\n\nSilakan ajukan melalui menu **Layanan Surat > Surat Kematian**.`;
  }

  if (msgLower.includes('jam') || msgLower.includes('buka') || msgLower.includes('tutup') || msgLower.includes('operasional') || msgLower.includes('jadwal')) {
    return `Halo! Berikut informasi jam operasional kantor kelurahan:\n\n${KNOWLEDGE_BASE.jamOperasional}`;
  }

  if (msgLower.includes('status') || msgLower.includes('lacak') || msgLower.includes('cek') || msgLower.includes('tracking') || msgLower.includes('kode')) {
    return `Halo! Untuk mengecek status pengajuan surat Anda:\n\n${KNOWLEDGE_BASE.trackingInfo}`;
  }

  if (msgLower.includes('syarat') || msgLower.includes('berkas') || msgLower.includes('persyaratan') || msgLower.includes('dokumen')) {
    return `Halo! Kelurahan melayani pengajuan 3 jenis surat online:\n\n1. **SKTM** (Syarat: Pengantar RT/RW, KTP, KK)\n2. **Surat Domisili** (Syarat: Pengantar RT/RW, KTP, KK)\n3. **Surat Kematian** (Syarat: Pengantar RT/RW, KTP Pemohon, KTP/KK Almarhum, Surat RS, KTP 2 Saksi)\n\nAda yang bisa saya bantu jelaskan lebih detail? 😊`;
  }

  if (msgLower.includes('halo') || msgLower.includes('hai') || msgLower.includes('selamat') || msgLower.includes('pagi') || msgLower.includes('siang') || msgLower.includes('sore')) {
    return `Halo! 👋 Selamat datang di Layanan Pelayanan Kelurahan Digital. Saya **Asisten AI Kelurahan**.\n\nAda yang bisa saya bantu hari ini? Anda bisa menanyakan syarat surat, jam operasional, atau cara pengajuan online.`;
  }

  // Default response
  return `Terima kasih telah menghubungi **Asisten AI Kelurahan Digital**! 🏛️\n\nSaya siap membantu Anda memberikan informasi mengenai:\n• 📄 Persyaratan SKTM, Surat Domisili, & Surat Kematian\n• ⏰ Jam Operasional Kantor Kelurahan\n• 🔍 Cara Cek Status Tracking Pengajuan\n\nSilakan ketik pertanyaan Anda atau pilih menu layanan di website.`;
}

module.exports = { generateAiResponse };
