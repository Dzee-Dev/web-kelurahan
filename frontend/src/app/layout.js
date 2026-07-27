import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AiChatWidget from '@/components/AiChatWidget';

export const metadata = {
  title: 'Kelurahan Mesjid Priyayi — Pelayanan Surat Online',
  description: 'Portal pelayanan publik Kelurahan Mesjid Priyayi, Kecamatan Kasemen, Kota Serang. Ajukan SKTM, Surat Domisili, dan Surat Kematian secara online.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <AiChatWidget />
      </body>
    </html>
  );
}
