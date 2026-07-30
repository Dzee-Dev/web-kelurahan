-- ============================================
-- Migration: Sistem Pelaporan Web Kelurahan
-- Jalankan SQL ini di PostgreSQL lokal VPS
-- ============================================

-- 1. Aktifkan ekstensi untuk UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Buat tabel pengajuan_surat
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
  dokumen_urls JSONB NOT NULL DEFAULT '{}'::jsonb,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'completed', 'rejected'))
);

-- 3. Index untuk query yang sering digunakan
CREATE INDEX IF NOT EXISTS idx_pengajuan_status ON pengajuan_surat(status);
CREATE INDEX IF NOT EXISTS idx_pengajuan_jenis ON pengajuan_surat(jenis_surat);
CREATE INDEX IF NOT EXISTS idx_pengajuan_nik ON pengajuan_surat(nik_pemohon);
CREATE INDEX IF NOT EXISTS idx_pengajuan_created ON pengajuan_surat(created_at DESC);
