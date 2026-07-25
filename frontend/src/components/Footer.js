import Link from 'next/link';
import { Building2, Phone, Mail, Clock, MapPin, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-base text-white block">KELURAHAN DIGITAL</span>
                <span className="text-[11px] text-slate-400">Portal Layanan Publik Resmi</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Sistem pelayanan pembuatan surat keterangan mandiri berbasis web resmi terintegrasi dengan WhatsApp Official (WABA) untuk mempercepat dan mempermudah urusan administrasi warga.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">Layanan Surat Online</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/pengajuan/sktm" className="hover:text-emerald-400 transition-colors">
                  • Surat Keterangan Tidak Mampu (SKTM)
                </Link>
              </li>
              <li>
                <Link href="/pengajuan/domisili" className="hover:text-emerald-400 transition-colors">
                  • Surat Keterangan Domisili Tempat Tinggal
                </Link>
              </li>
              <li>
                <Link href="/pengajuan/kematian" className="hover:text-emerald-400 transition-colors">
                  • Surat Pelaporan Kematian Warga
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="hover:text-emerald-400 transition-colors">
                  • Tracking & Cek Status Pengajuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">Jam Layanan Pelayanan</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2 font-medium text-slate-200">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Senin - Jumat: 08.00 - 15.00 WIB</span>
              </p>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Formulir pengajuan online dapat diakses 24 jam nonstop. Verifikasi dan penandatanganan surat dilakukan pada hari kerja kantor kelurahan.
              </p>
            </div>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">Kontak Kantor Kelurahan</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Jl. Raya Kelurahan No. 1, Kecamatan Kantor, Kota Administrasi</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Admin WABA Official</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>pelayanan@kelurahan.go.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Kelurahan Digital — Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-medium">
            <ShieldCheck className="w-4 h-4" /> Official WhatsApp Business API & Supabase Integration
          </div>
        </div>
      </div>
    </footer>
  );
}
