# PRD & Technical Architecture: Sistem Pelaporan Web Kelurahan
*(Dokumen ini dioptimalkan untuk dibaca oleh AI Agent / AI Coder sebagai instruksi pengembangan proyek)*

## 1. Project Overview
Pembuatan aplikasi berbasis web untuk warga kelurahan agar dapat melakukan pelaporan dan pengajuan surat secara mandiri. Sistem ini mengintegrasikan pengisian form teks berbasis web dan unggah dokumen dengan pengiriman notifikasi/pesan ke WhatsApp Admin Kelurahan (menggunakan Official WABA) untuk memudahkan komunikasi antara warga dan admin.

## 2. Technical Decisions & Tech Stack (Opsi A)
Berdasarkan keputusan, proyek ini menggunakan pendekatan *Code-Heavy* dengan fokus pada skalabilitas dan biaya operasional rendah (menggunakan *free-tier* layanan cloud), serta alur input data dan upload dokumen terpusat.

*   **Frontend Web:** Next.js (React) + TailwindCSS. Form akan menggunakan validasi seperti `React Hook Form` dan `Zod`.
*   **Database & Storage:** Supabase (PostgreSQL untuk data tabular, Supabase Storage untuk file upload).
*   **WhatsApp Engine:** Official WhatsApp Business API (WABA) dari Meta.
*   **Backend / Webhook Server:** Node.js (Express.js) untuk menerima webhook dari WABA dan mengatur logika jam operasional bot.
*   **Hosting:**
    *   Frontend: Vercel (Free tier).
    *   Backend (Node.js): Render / Railway (Free tier atau tier termurah) atau VPS (jika tersedia).

## 3. Alur Sistem Utama (System Flow)
1.  **User Input:** Warga membuka Web, memilih jenis surat, mengisi **form data diri lengkap** beserta detail keperluan, dan mengunggah (upload) foto dokumen persyaratannya.
2.  **Upload to Cloud:** Saat form di-submit, frontend mengunggah file foto tersebut ke **Supabase Storage**.
3.  **Database Insert:** Setelah upload berhasil, sistem mencatat seluruh isian form warga beserta **URL/Link** dari file yang diunggah ke **Supabase Database**.
4.  **Redirect to WA:** Web men-generate pesan teks (URL Encoded) berisi rekap lengkap data pengajuan (isian form) dan *Link Document*, lalu me-redirect warga ke WhatsApp Admin menggunakan *deep link* (`wa.me/<nomor_waba>?text=...`).
5.  **User Sends Message:** Warga menekan tombol kirim di aplikasi WhatsApp mereka. Pesan masuk ke sistem WABA Kelurahan.
6.  **Webhook & Bot Logic (Time-based):**
    *   WABA mengirim Webhook ke Node.js Backend.
    *   Backend mengecek waktu saat ini (Timezone: Asia/Jakarta - WIB).
    *   **Jam Operasional (08:00 - 15:00 WIB):** Bot membalas dengan *Auto-greeting*: "Terima kasih, laporan Anda telah kami terima. Admin kami akan segera merespons dan memproses pengajuan Anda." Setelah itu, Admin Manusia mengambil alih percakapan (lewat WhatsApp Inbox/Omnichannel).
    *   **Luar Jam Operasional (15:01 - 07:59 WIB):** Bot membalas: "Mohon maaf, saat ini di luar jam operasional kantor. Pesan Anda telah kami terima dan akan diproses pada hari kerja berikutnya mulai pukul 08:00 WIB."

## 4. Product Requirements (Fitur & Data)

### A. Kebutuhan Data Form per Kategori Surat
**Input Data Umum (Wajib diisi pada SEMUA form):**
*   Nama Lengkap Pemohon
*   NIK (16 digit angka)
*   Tempat, Tanggal Lahir
*   Jenis Kelamin
*   Agama
*   Pekerjaan
*   Alamat Lengkap (Jalan/Dusun, RT/RW)
*   No. HP / WhatsApp Pemohon (Aktif)

**Kategori 1: Surat Keterangan Tidak Mampu (SKTM)**
*   **Text Fields Tambahan:**
    *   Keperluan Pembuatan SKTM (Contoh: Pengajuan Beasiswa, Keringanan Biaya RS, dll)
*   **File Uploads:**
    1.  Surat Pengantar RT/RW
    2.  KTP Pemohon
    3.  Kartu Keluarga (KK)

**Kategori 2: Surat Domisili**
*   **Text Fields Tambahan:**
    *   Alamat Asal (Sesuai KTP)
    *   Alamat Domisili Saat Ini
    *   Keperluan Pembuatan Surat Domisili (Contoh: Melamar Pekerjaan, Syarat Bank, dll)
*   **File Uploads:**
    1.  Surat Pengantar RT/RW
    2.  KTP Pemohon
    3.  Kartu Keluarga (KK)

**Kategori 3: Surat Kematian**
*   **Text Fields Tambahan:**
    *   Nama Lengkap Almarhum/Almarhumah
    *   NIK Almarhum/Almarhumah
    *   Tanggal Kematian
    *   Tempat Meninggal (Contoh: RSUD, Rumah, dll)
    *   Penyebab Kematian
    *   Hubungan Pemohon dengan Almarhum/Almarhumah (Contoh: Anak, Suami/Istri, Saudara)
*   **File Uploads:**
    1.  Surat Pengantar RT/RW
    2.  KTP Pemohon
    3.  KTP Almarhum
    4.  KK Almarhum
    5.  Surat Kematian Asli dari RS (Rumah Sakit) atau Surat Keterangan Dokter
    6.  Akta Kelahiran Almarhum (Opsional)
    7.  KTP Saksi 1
    8.  KTP Saksi 2

### B. Database Schema Suggestion (Supabase)
**Table: `pengajuan_surat`**
*   `id` (uuid, primary key)
*   `created_at` (timestamp, default now)
*   `jenis_surat` (varchar: 'sktm', 'domisili', 'kematian')
*   `nama_pemohon` (varchar)
*   `nik_pemohon` (varchar)
*   `no_hp` (varchar)
*   `alamat_lengkap` (text)
*   `data_pribadi` (jsonb) -> Tempat/tgl lahir, agama, kelamin, pekerjaan
*   `data_tambahan` (jsonb) -> Keperluan surat, Alamat asal (domisili), Data Almarhum (kematian)
*   `dokumen_urls` (jsonb) -> Untuk menyimpan URL file-file yang di-upload
*   `status` (varchar: 'pending', 'processed', 'completed')

## 5. Instruksi Pengembangan (Task for AI Agent)
1.  **Setup Frontend & Form Builder:** Inisialisasi Next.js app. Gunakan `react-hook-form` dikombinasikan dengan `zod` untuk validasi input teks warga (seperti validasi NIK wajib 16 digit).
2.  **Supabase Integration:** Setup Supabase client. Buat fungsi untuk *upload file* (multipart/form-data) ke Supabase Storage, dapatkan `publicUrl`. Buat fungsi untuk insert data form gabungan (teks + URL file) ke PostgreSQL database.
3.  **WA URL Generator:** Buat fungsi utilitas untuk merangkai semua input form teks (nama, NIK, alamat, keperluan, dll) dan link dokumen menjadi satu pesan terstruktur (URL encoded format `wa.me`).
4.  **Setup Backend Webhook:** Inisialisasi Express.js server. Siapkan endpoint `POST /webhook/waba` untuk menerima event dari Meta/WhatsApp Cloud API.
5.  **Bot Time Logic:** Implementasikan logika *date-time* menggunakan `moment-timezone` atau `date-fns-tz` untuk zona waktu Asia/Jakarta (WIB) guna menentukan balasan operasional dan non-operasional.
6.  **WABA Messaging:** Integrasikan endpoint Meta Cloud API untuk mengirim pesan balasan balik (send text message) ke nomor WhatsApp warga.
