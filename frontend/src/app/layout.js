import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AiChatWidget from '@/components/AiChatWidget';

export const metadata = {
  title: 'Sistem Pelaporan & Pengajuan Surat Web Kelurahan',
  description: 'Layanan mandiri pengajuan surat keterangan warga kelurahan terintegrasi dengan WhatsApp Official (WABA) dan Bot AI Customer Service.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="dark">
      <body className="antialiased flex flex-col min-h-screen relative">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <AiChatWidget />
      </body>
    </html>
  );
}
