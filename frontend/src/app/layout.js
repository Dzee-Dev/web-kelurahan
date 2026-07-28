import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AiChatWidget from '@/components/AiChatWidget';

export const metadata = {
  title: 'Kelurahan Mesjid Priyayi — Pelayanan Surat Online',
  description: 'Portal pelayanan publik Kelurahan Mesjid Priyayi, Kecamatan Kasemen, Kota Serang. Ajukan SKTM, Surat Domisili, dan Surat Kematian secara online.',
  openGraph: {
    title: 'Kelurahan Mesjid Priyayi — Pelayanan Surat Online',
    description: 'Portal pelayanan publik Kelurahan Mesjid Priyayi, Kecamatan Kasemen, Kota Serang.',
    url: 'https://web-kelurahan.vercel.app',
    siteName: 'Kelurahan Mesjid Priyayi',
    images: [
      {
        url: 'https://web-kelurahan.vercel.app/logo.jpeg',
        width: 600,
        height: 600,
        alt: 'Logo Kelurahan Mesjid Priyayi Kota Serang',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
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
