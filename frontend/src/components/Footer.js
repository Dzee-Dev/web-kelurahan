import Link from 'next/link';
import { Phone, Mail, Clock, MapPin, MessageSquareWarning } from 'lucide-react';
import { ADMIN_WHATSAPP_DISPLAY, COMPLAINT_WHATSAPP_URL } from '@/lib/contact';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img src="/logo.jpeg" alt="Logo" className="w-9 h-9 rounded object-contain" />
              <div>
                <div className="font-bold text-white text-sm">Kelurahan Mesjid Priyayi</div>
                <div className="text-xs text-gray-500">Kec. Kasemen, Kota Serang</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Portal pelayanan publik untuk pembuatan surat keterangan kependudukan secara online.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Layanan Surat</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pengajuan/sktm" className="hover:text-white transition-colors">SKTM</Link></li>
              <li><Link href="/pengajuan/domisili" className="hover:text-white transition-colors">Surat Domisili</Link></li>
              <li><Link href="/pengajuan/kematian" className="hover:text-white transition-colors">Surat Kematian</Link></li>
              <li><Link href="/tracking" className="hover:text-white transition-colors">Lacak Pengajuan</Link></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Jam Pelayanan</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>Senin – Jumat, 08.00 – 15.00 WIB</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Formulir online dapat diakses 24 jam. Verifikasi dilakukan pada jam kerja.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Kontak</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                <span>Jl. Mesjid Priyayi No. 75, Kasemen 42191, Serang – Banten</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                <span>{ADMIN_WHATSAPP_DISPLAY}</span>
              </li>
              <li>
                <a href={COMPLAINT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-rose-300 hover:text-white transition-colors">
                  <MessageSquareWarning className="w-4 h-4 shrink-0" />
                  <span>Kirim Pengaduan via WhatsApp</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="truncate">mesjidpriyayikelurahan@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Kelurahan Mesjid Priyayi, Kasemen – Kota Serang, Banten
        </div>
      </div>
    </footer>
  );
}
