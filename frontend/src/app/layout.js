import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Sistem Pelaporan & Pengajuan Surat Web Kelurahan',
  description: 'Layanan mandiri pengajuan surat keterangan warga kelurahan terintegrasi dengan WhatsApp Official (WABA).',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="dark">
      <body className="antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
