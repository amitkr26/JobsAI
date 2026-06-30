import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'ElectroBridge — AI-Powered Career Platform for Electronics & Semiconductors',
  description: 'Verified internships, research fellowships, PhD scholarships, and industry roles — curated for electronics engineers and semiconductor professionals. AI-matched to your skills.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://electrobridge.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${geistMono.variable} antialiased bg-[#0B1120] text-white`}>
        <Navbar />
        <main className="min-h-screen pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
