-- ============================================
-- Migration: Sistem Pelaporan Web Kelurahan
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================

-- 1. Buat tabel pengajuan_surat
CREATE TABLE IF NOT EXISTS pengajuan_surat (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  jenis_surat VARCHAR(20) NOT NULL CHECK (jenis_surat IN ('sktm', 'domisili', 'kematian')),
  nama_pemohon VARCHAR(255) NOT NULL,
  nik_pemohon VARCHAR(16) NOT NULL,
  no_hp VARCHAR(20) NOT NULL,
  alamat_lengkap TEXT NOT NULL,
  data_pribadi JSONB NOT NULL DEFAULT '{}'::jsonb,
  data_tambahan JSONB NOT NULL DEFAULT '{}'::jsonb,
  dokumen_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'completed', 'rejected'))
);

-- 2. Index untuk query yang sering digunakan
CREATE INDEX IF NOT EXISTS idx_pengajuan_status ON pengajuan_surat(status);
CREATE INDEX IF NOT EXISTS idx_pengajuan_jenis ON pengajuan_surat(jenis_surat);
CREATE INDEX IF NOT EXISTS idx_pengajuan_nik ON pengajuan_surat(nik_pemohon);
CREATE INDEX IF NOT EXISTS idx_pengajuan_created ON pengajuan_surat(created_at DESC);

-- 3. Enable Row Level Security
ALTER TABLE pengajuan_surat ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Allow insert from authenticated & anon (warga submit tanpa login)
CREATE POLICY "Allow public insert" ON pengajuan_surat
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 5. Policy: Allow read for authenticated users only (admin)
CREATE POLICY "Allow authenticated read" ON pengajuan_surat
  FOR SELECT
  TO authenticated
  USING (true);

-- 6. Policy: Allow update for authenticated users only (admin update status)
CREATE POLICY "Allow authenticated update" ON pengajuan_surat
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Storage Bucket Setup
-- Jalankan di Supabase SQL Editor juga
-- ============================================

-- 7. Buat storage bucket untuk dokumen
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'dokumen-pengajuan',
  'dokumen-pengajuan',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- 8. Policy: Allow public upload to dokumen-pengajuan bucket
CREATE POLICY "Allow public upload" ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'dokumen-pengajuan');

-- 9. Policy: Allow public read from dokumen-pengajuan bucket
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'dokumen-pengajuan');
