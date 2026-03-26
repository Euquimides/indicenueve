import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { loadArtistsFromFile } from '@/lib/artists.server';
import { computeStats } from '@/lib/stats';

export const metadata: Metadata = {
  title: 'Estadísticas — Índice Nueve',
  description: 'Datos y estadísticas sobre los artistas de cómic costarricense en el Índice Nueve.',
};

// Chart.js uses canvas — client-only
const StatsCharts = dynamic(() => import('@/components/StatsCharts'), { ssr: false });

export default function EstadisticasPage() {
  const artists = loadArtistsFromFile();
  const stats = computeStats(artists);

  return (
    <div className="pt-16 min-h-screen bg-surface">
      <main className="max-w-[900px] mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-20">

        <header className="mb-8 md:mb-12">
          <p className="text-[0.6875rem] uppercase tracking-widest text-outline font-label mb-4">
            El índice en números
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-on-surface leading-tight mb-6">
            Estadísticas
          </h1>
          <p className="text-base text-on-surface-variant leading-relaxed font-body">
            Un vistazo cuantitativo al cómic costarricense: roles, géneros, alcance internacional y más.
            Los datos se actualizan automáticamente con cada cambio al índice.
          </p>
        </header>

        <StatsCharts stats={stats} />

      </main>
    </div>
  );
}
