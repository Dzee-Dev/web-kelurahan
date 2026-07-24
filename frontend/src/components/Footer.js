import Link from 'next/link';
import { Building2, Phone, Mail, Clock, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-panel border-t border-slate-800 mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="font-bold text-lg text-white">Sistem Kelurahan</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Pelayanan mandiri pembuatan surat keterangan & pengaduan masyarakat secara digital cepat, aman, dan terintegrasi WhatsApp Official.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Layanan Mandiri</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/pengajuan/sktm" className="hover:text-emerald-400 transition-colors">
                  Surat Keterangan Tidak Mampu (SKTM)
                </Link>
              </li>
              <li>
                <Link href="/pengajuan/domisili" className="hover:text-emerald-400 transition-colors">
                  Surat Keterangan Domisili
                </Link>
              </li>
              <li>
                <Link href="/pengajuan/kematian" className="hover:text-emerald-400 transition-colors">
                  Surat Keterangan Kematian
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="hover:text-emerald-400 transition-colors">
                  Cek Status Pengajuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Jam Operasional</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Senin - Jumat: 08.00 - 15.00 WIB</span>
              </p>
              <p className="text-slate-500 text-xs pl-6">
                (Isian form dapat dilakukan 24 jam. Respon WhatsApp admin disesuaikan jam kerja)
              </p>
            </div>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Kontak Kelurahan</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <span>Jl. Raya Kelurahan No. 1, Kecamatan Kantor, Kota Admin</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Admin WABA</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>layanan@kelurahan.go.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Pelayanan Mandiri Kelurahan Digital. Hak Cipta Dilindungi.</p>
          <p className="text-slate-400 flex items-center gap-1">
            <span>Official WhatsApp Business API Integration</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
