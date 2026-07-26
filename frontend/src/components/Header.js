'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, FileText, Home, UserCheck, Search, Menu, X, ShieldCheck, ChevronDown, Phone, MapPin, Mail, Users } from 'lucide-react';
import OperationalBadge from './OperationalBadge';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      
      {/* Top Header Bar (Government Style) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Jl. Mesjid Priyayi No. 75, Kasemen 42191, Serang - Banten</span>
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <a href="mailto:mesjidpriyayikelurahan@gmail.com" className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>mesjidpriyayikelurahan@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" /> Portal Pelayanan Publik Resmi
            </span>
            <span className="text-slate-700">|</span>
            <a href="tel:112" className="text-slate-300 hover:text-white flex items-center gap-1 text-[11px]">
              <Phone className="w-3.5 h-3.5 text-amber-400" /> Panggilan Darurat: 112
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Emblem */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-sm group-hover:border-amber-400 transition-colors shrink-0">
              <img src="/logo.jpeg" alt="Logo Kelurahan Mesjid Priyayi" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">KELURAHAN MESJID PRIYAYI</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Kec. Kasemen, Kota Serang - Banten</p>
            </div>
          </Link>

          {/* Operational Status Pill */}
          <div className="hidden xl:block">
            <OperationalBadge />
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-slate-700 hover:text-blue-900 font-semibold text-xs sm:text-sm transition-colors py-2"
            >
              Beranda
            </Link>

            <Link
              href="/#profil"
              className="text-slate-700 hover:text-blue-900 font-semibold text-xs sm:text-sm transition-colors py-2"
            >
              Profil & Visi Misi
            </Link>

            <Link
              href="/#struktur"
              className="flex items-center gap-1 text-slate-700 hover:text-blue-900 font-semibold text-xs sm:text-sm transition-colors py-2"
            >
              <Users className="w-4 h-4 text-amber-600" />
              Struktur Organisasi
            </Link>

            <Link
              href="/tracking"
              className="flex items-center gap-1 text-slate-700 hover:text-blue-900 font-semibold text-xs sm:text-sm transition-colors py-2"
            >
              <Search className="w-4 h-4 text-blue-700" />
              Tracking Surat
            </Link>

            {/* Dropdown Buat Pengajuan */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className="btn-emerald text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm"
              >
                <span>Ajukan Surat</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 space-y-1 z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Pilih Kategori Surat:
                  </div>

                  <Link
                    href="/pengajuan/sktm"
                    className="flex items-center gap-3 px-4 py-3 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">SKTM</div>
                      <div className="text-[11px] text-slate-500">Surat Keterangan Tidak Mampu</div>
                    </div>
                  </Link>

                  <Link
                    href="/pengajuan/domisili"
                    className="flex items-center gap-3 px-4 py-3 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Surat Domisili</div>
                      <div className="text-[11px] text-slate-500">Surat Tempat Tinggal Sementara</div>
                    </div>
                  </Link>

                  <Link
                    href="/pengajuan/kematian"
                    className="flex items-center gap-3 px-4 py-3 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Surat Kematian</div>
                      <div className="text-[11px] text-slate-500">Surat Pelaporan Kematian Warga</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in fade-in duration-200">
          <div className="pt-2">
            <OperationalBadge />
          </div>

          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-slate-800 hover:text-blue-900 text-sm py-2.5 border-b border-slate-100"
            >
              Beranda Utama
            </Link>
            <Link
              href="/#profil"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-slate-800 hover:text-blue-900 text-sm py-2.5 border-b border-slate-100"
            >
              Profil Kelurahan
            </Link>
            <Link
              href="/#struktur"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-slate-800 hover:text-blue-900 text-sm py-2.5 border-b border-slate-100"
            >
              Struktur Organisasi
            </Link>
            <Link
              href="/tracking"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-slate-800 hover:text-blue-900 text-sm py-2.5 border-b border-slate-100"
            >
              Tracking Status Pengajuan Surat
            </Link>
          </div>

          <div className="pt-2 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Pilih Jenis Surat:</span>
            <Link
              href="/pengajuan/sktm"
              onClick={() => setMobileMenuOpen(false)}
              className="natural-card p-3 font-bold text-emerald-800 text-sm block bg-emerald-50 border-emerald-200"
            >
              📄 1. Surat Keterangan Tidak Mampu (SKTM)
            </Link>
            <Link
              href="/pengajuan/domisili"
              onClick={() => setMobileMenuOpen(false)}
              className="natural-card p-3 font-bold text-blue-800 text-sm block bg-blue-50 border-blue-200"
            >
              🏠 2. Surat Keterangan Domisili
            </Link>
            <Link
              href="/pengajuan/kematian"
              onClick={() => setMobileMenuOpen(false)}
              className="natural-card p-3 font-bold text-rose-800 text-sm block bg-rose-50 border-rose-200"
            >
              👤 3. Surat Keterangan Kematian
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
