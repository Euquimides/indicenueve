import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="font-bangers text-8xl text-comic-yellow mb-4">404</p>
      <h1 className="font-bangers text-4xl text-comic-ink uppercase mb-6">Página no encontrada</h1>
      <Link
        href="/"
        className="inline-block bg-comic-ink text-comic-yellow font-bold uppercase py-3 px-8 border-2 border-comic-ink hover:bg-comic-yellow hover:text-comic-ink transition-colors text-sm tracking-wide shadow-comic"
      >
        Volver al directorio
      </Link>
    </main>
  );
}
