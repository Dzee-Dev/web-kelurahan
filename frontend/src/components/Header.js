'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, FileText, Home, UserCheck, Search, Menu, X, ShieldCheck, ChevronDown } from 'lucide-react';
import OperationalBadge from './OperationalBadge';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">Pelayanan Warga</span>
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> WABA Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Kantor Kelurahan Digital</p>
            </div>
          </Link>

          {/* Center: Live Status Badge */}
          <div className="hidden lg:block">
            <OperationalBadge />
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className="text-slate-300 hover:text-emerald-400 text-sm font-medium transition-colors px-3 py-2"
            >
              Beranda
            </Link>
            <Link
              href="/tracking"
              className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 text-sm font-medium transition-colors px-3 py-2"
            >
              <Search className="w-4 h-4 text-emerald-400" />
              Tracking Status
            </Link>

            {/* Dropdown Buat Pengajuan */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className="gradient-btn text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <span>Buat Pengajuan Surat</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl border border-slate-700/80 shadow-2xl py-2 space-y-1 z-50 animate-in fade-in duration-150">
                  <Link
                    href="/pengajuan/sktm"
                    className="flex items-center gap-3 px-4 py-3 text-xs text-slate-200 hover:text-emerald-400 hover:bg-slate-800/80 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white">SKTM</div>
                      <div className="text-[10px] text-slate-400">Surat Keterangan Tidak Mampu</div>
                    </div>
                  </Link>

                  <Link
                    href="/pengajuan/domisili"
                    className="flex items-center gap-3 px-4 py-3 text-xs text-slate-200 hover:text-emerald-400 hover:bg-slate-800/80 transition-colors"
                  >
                    <Home className="w-4 h-4 text-blue-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white">Surat Domisili</div>
                      <div className="text-[10px] text-slate-400">Surat Keterangan Tempat Tinggal</div>
                    </div>
                  </Link>

                  <Link
                    href="/pengajuan/kematian"
                    className="flex items-center gap-3 px-4 py-3 text-xs text-slate-200 hover:text-emerald-400 hover:bg-slate-800/80 transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-rose-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white">Surat Kematian</div>
                      <div className="text-[10px] text-slate-400">Surat Pelaporan Kematian Warga</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <OperationalBadge />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-emerald-400 text-base font-medium py-2 border-b border-slate-800"
          >
            🏛️ Beranda Layanan
          </Link>
          <Link
            href="/tracking"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-emerald-400 text-base font-medium py-2 border-b border-slate-800"
          >
            🔍 Tracking Status Surat
          </Link>
          <div className="pt-2 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block px-1">Pilih Jenis Surat:</span>
            <Link
              href="/pengajuan/sktm"
              onClick={() => setMobileMenuOpen(false)}
              className="glass-card w-full text-left text-emerald-400 text-sm font-semibold px-4 py-3 rounded-xl block border border-emerald-500/20"
            >
              📄 SKTM (Surat Tidak Mampu)
            </Link>
            <Link
              href="/pengajuan/domisili"
              onClick={() => setMobileMenuOpen(false)}
              className="glass-card w-full text-left text-blue-400 text-sm font-semibold px-4 py-3 rounded-xl block border border-blue-500/20"
            >
              🏠 Surat Keterangan Domisili
            </Link>
            <Link
              href="/pengajuan/kematian"
              onClick={() => setMobileMenuOpen(false)}
              className="glass-card w-full text-left text-rose-400 text-sm font-semibold px-4 py-3 rounded-xl block border border-rose-500/20"
            >
              👤 Surat Keterangan Kematian
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
