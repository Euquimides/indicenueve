import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'i9',
  description: 'Descubre y explora el talento del cómic costarricense.',
  openGraph: {
    title: 'Índice Nueve',
    description: 'Directorio de artistas costarricenses de cómics',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Runs before paint to prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(s===null&&d))document.documentElement.classList.add('dark');}catch(e){}})();` }} />
      </head>
      <body className="font-body bg-surface text-on-surface antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
