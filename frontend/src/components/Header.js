'use client';

import { useState } from 'react';
import Link from 'next/link';
import QrModal from '@/components/QrModal';
import { COMPLAINT_WHATSAPP_URL, ADMIN_WHATSAPP_DISPLAY } from '@/lib/contact';
import { FileText, Home, UserCheck, Search, Menu, X, ChevronDown, Phone, MapPin, Mail, QrCode, MessageSquareWarning } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      
      {/* Top Info Bar */}
      <div className="bg-gray-800 text-gray-300 text-[13px] py-1.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Jl. Mesjid Priyayi No. 75, Kasemen 42191
            </span>
            <span className="text-gray-600">|</span>
            <a href="mailto:mesjidpriyayikelurahan@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" />
              mesjidpriyayikelurahan@gmail.com
            </a>
          </div>
          <a href="tel:+6285287434646" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span>{ADMIN_WHATSAPP_DISPLAY}</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="Logo" className="w-10 h-10 rounded-lg object-contain" />
            <div>
              <div className="font-bold text-gray-900 text-[15px] leading-tight">Kelurahan Mesjid Priyayi</div>
              <div className="text-[12px] text-gray-500">Kec. Kasemen, Kota Serang</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
              Beranda
            </Link>
            <Link href="/#profil" className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
              Profil
            </Link>
            <Link href="/#struktur" className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
              Struktur Organisasi
            </Link>
            <a
              href={COMPLAINT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm text-rose-700 hover:bg-rose-50 rounded-md transition-colors flex items-center gap-1.5 font-medium"
            >
              <MessageSquareWarning className="w-4 h-4" />
              Pengaduan
            </a>
            <button
              onClick={() => setQrModalOpen(true)}
              className="px-3 py-2 text-sm text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors flex items-center gap-1.5 font-medium"
              title="Tampilkan Barcode / QR Code Website"
            >
              <QrCode className="w-4 h-4 text-emerald-600" />
              <span>Barcode Web</span>
            </button>

            <div className="relative ml-2">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className="btn-emerald flex items-center gap-1.5 text-sm"
              >
                Ajukan Surat
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50">
                  <Link href="/pengajuan/sktm" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <FileText className="w-4 h-4 text-green-700" />
                    <div>
                      <div className="font-semibold text-gray-900">SKTM</div>
                      <div className="text-xs text-gray-500">Surat Keterangan Tidak Mampu</div>
                    </div>
                  </Link>
                  <Link href="/pengajuan/domisili" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Home className="w-4 h-4 text-blue-700" />
                    <div>
                      <div className="font-semibold text-gray-900">Surat Domisili</div>
                      <div className="text-xs text-gray-500">Keterangan Tempat Tinggal</div>
                    </div>
                  </Link>
                  <Link href="/pengajuan/kematian" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <UserCheck className="w-4 h-4 text-gray-700" />
                    <div>
                      <div className="font-semibold text-gray-900">Surat Kematian</div>
                      <div className="text-xs text-gray-500">Pelaporan Kematian Warga</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-1">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 text-sm text-gray-700 hover:text-gray-900 font-medium">Beranda</Link>
          <Link href="/#profil" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 text-sm text-gray-700 hover:text-gray-900 font-medium">Profil</Link>
          <Link href="/#struktur" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 text-sm text-gray-700 hover:text-gray-900 font-medium">Struktur Organisasi</Link>
          <Link href="/tracking" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 text-sm text-gray-700 hover:text-gray-900 font-medium">Lacak Surat</Link>
          <a
            href={COMPLAINT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 text-sm text-rose-700 font-semibold flex items-center gap-2"
          >
            <MessageSquareWarning className="w-4 h-4" />
            <span>Pengaduan via WhatsApp</span>
          </a>
          <button
            onClick={() => { setMobileMenuOpen(false); setQrModalOpen(true); }}
            className="w-full text-left py-2.5 text-sm text-emerald-700 font-semibold flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Barcode QR Web</span>
          </button>
          <div className="pt-3 border-t border-gray-100 space-y-1.5">
            <Link href="/pengajuan/sktm" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm font-medium text-green-800 bg-green-50 rounded-md">SKTM — Surat Tidak Mampu</Link>
            <Link href="/pengajuan/domisili" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm font-medium text-blue-800 bg-blue-50 rounded-md">Surat Domisili</Link>
            <Link href="/pengajuan/kematian" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm font-medium text-gray-800 bg-gray-50 rounded-md">Surat Kematian</Link>
          </div>
        </div>
      )}

      {/* QR Modal */}
      <QrModal isOpen={qrModalOpen} onClose={() => setQrModalOpen(false)} />
    </header>
  );
}
