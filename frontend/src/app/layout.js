import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AiChatWidget from '@/components/AiChatWidget';

export const metadata = {
  metadataBase: new URL('https://web-kelurahan-blush.vercel.app'),
  title: 'Kelurahan Mesjid Priyayi — Pelayanan Surat Online',
  description: 'Portal pelayanan publik Kelurahan Mesjid Priyayi, Kecamatan Kasemen, Kota Serang. Ajukan SKTM, Surat Domisili, dan Surat Kematian secara online.',
  openGraph: {
    title: 'Kelurahan Mesjid Priyayi — Pelayanan Surat Online',
    description: 'Portal pelayanan publik Kelurahan Mesjid Priyayi, Kecamatan Kasemen, Kota Serang.',
    url: 'https://web-kelurahan-blush.vercel.app',
    siteName: 'Kelurahan Mesjid Priyayi',
    images: [
      {
        url: '/logo-serang.png',
        width: 783,
        height: 658,
        alt: 'Logo Kota Serang Madani — Kelurahan Mesjid Priyayi',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kelurahan Mesjid Priyayi — Pelayanan Surat Online',
    description: 'Portal pelayanan publik Kelurahan Mesjid Priyayi, Kasemen, Kota Serang.',
    images: ['/logo-serang.png'],
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
