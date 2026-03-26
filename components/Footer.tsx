import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant/10 bg-surface">
      <div className="max-w-[1920px] mx-auto px-8 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-[0.6875rem] uppercase tracking-widest text-outline font-label">
          © {new Date().getFullYear()} Índice Nueve —{' '}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-on-surface transition-colors"
          >
            CC BY 4.0
          </a>
        </p>
        <nav className="flex gap-6" aria-label="Enlaces del pie de página">
          <Link
            href="/disclaimer"
            className="text-[0.6875rem] uppercase tracking-widest text-outline hover:text-on-surface transition-colors font-label"
          >
            Aviso Legal
          </Link>
          <a
            href="https://github.com/Euquimides/indicenueve"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.6875rem] uppercase tracking-widest text-outline hover:text-on-surface transition-colors font-label"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
