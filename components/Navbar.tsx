'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.4 3.4l1.06 1.06M11.54 11.54l1.06 1.06M12.6 3.4l-1.06 1.06M4.46 11.54l-1.06 1.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M14 8.53A6 6 0 1 1 7.47 2 4.67 4.67 0 0 0 14 8.53z" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const isActive = (path: string) =>
    path === '/'
      ? pathname === basePath + '/' || pathname === basePath
      : pathname === basePath + path;

  // Uses on-surface (not primary) so it inverts correctly in dark mode
  const activeClass = 'text-on-surface font-semibold border-b border-on-surface pb-1';
  const inactiveClass = 'text-outline hover:text-on-surface transition-colors duration-200';

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="w-9 h-9 flex items-center justify-center text-outline hover:text-on-surface transition-colors duration-200 shrink-0"
    >
      {mounted ? (dark ? <SunIcon /> : <MoonIcon />) : <span className="w-4 h-4" />}
    </button>
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="flex justify-between items-center px-8 py-4 max-w-[1920px] mx-auto">
        <Link href="/" className="text-xl font-bold tracking-tighter text-on-surface hover:text-comic-red transition-colors duration-300">
          i<span className="text-4xl">9</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm tracking-tight">
          <nav className="flex gap-8">
            <Link href="/" className={isActive('/') ? activeClass : inactiveClass} aria-current={isActive('/') ? 'page' : undefined}>
              El Índice
            </Link>
            <Link href="/acerca-de" className={isActive('/acerca-de') ? activeClass : inactiveClass} aria-current={isActive('/acerca-de') ? 'page' : undefined}>
              Acerca De
            </Link>
            <Link href="/faq" className={isActive('/faq') ? activeClass : inactiveClass} aria-current={isActive('/faq') ? 'page' : undefined}>
              FAQ
            </Link>
           <Link href="/estadisticas" className={isActive('/estadisticas') ? activeClass : inactiveClass} aria-current={isActive('/estadisticas') ? 'page' : undefined}>
              Estadísticas
            </Link>
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            className="flex flex-col justify-center gap-[5px] w-11 h-11 -mr-2 text-on-surface"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <span className={`block w-5 h-px bg-current mx-auto transition-transform duration-200 origin-center ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
            <span className={`block w-5 h-px bg-current mx-auto transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-current mx-auto transition-transform duration-200 origin-center ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-outline-variant/10 bg-surface px-8 py-5 flex flex-col gap-1 font-medium text-sm tracking-tight"
        >
          <Link href="/" className={`py-3 ${isActive('/') ? 'text-on-surface font-semibold' : 'text-outline'}`} aria-current={isActive('/') ? 'page' : undefined}>
            El Índice
          </Link>
          <Link href="/acerca-de" className={`py-3 ${isActive('/acerca-de') ? 'text-on-surface font-semibold' : 'text-outline'}`} aria-current={isActive('/acerca-de') ? 'page' : undefined}>
            Acerca De
          </Link>
          <Link href="/faq" className={`py-3 ${isActive('/faq') ? 'text-on-surface font-semibold' : 'text-outline'}`} aria-current={isActive('/faq') ? 'page' : undefined}>
            FAQ
          </Link>
          <Link href="/estadisticas" className={`py-3 ${isActive('/estadisticas') ? 'text-on-surface font-semibold' : 'text-outline'}`} aria-current={isActive('/estadisticas') ? 'page' : undefined}>
            Estadísticas
          </Link>
        </nav>
      )}
    </header>
  );
}
