'use client';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import type { TooltipItem } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import type { ArtistStats } from '@/lib/stats';
import { formatLabel } from '@/lib/stats';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// ─── Palette ────────────────────────────────────────────────────────────────
const YELLOW = '#ffde00';
const RED    = '#e63946';
const BLUE   = '#3f627b';

// ─── Hooks ──────────────────────────────────────────────────────────────────
function useDark() {
  const [dark, setDark] = useState(() =>
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : false
  );
  useEffect(() => {
    const update = () => setDark(document.documentElement.classList.contains('dark'));
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

// ─── Shared UI ───────────────────────────────────────────────────────────────
function StatCard({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="border border-outline-variant/20 bg-surface-container-low p-6">
      <div className={`text-3xl sm:text-4xl font-bold tracking-tighter ${accent ?? 'text-on-surface'}`}>
        {value}
      </div>
      <div className="text-[0.6875rem] uppercase tracking-widest text-outline font-label mt-2">
        {label}
      </div>
    </div>
  );
}

function ChartCard({
  title,
  ariaLabel,
  children,
  className = '',
}: {
  title: string;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-outline-variant/20 bg-surface-container-low p-6 ${className}`}>
      <h2 className="text-[0.6875rem] uppercase tracking-widest text-outline font-label mb-6">
        {title}
      </h2>
      <div role="img" aria-label={ariaLabel}>
        {children}
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function StatsCharts({ stats }: { stats: ArtistStats }) {
  const dark = useDark();
  const textColor = dark ? '#9aa3a3' : '#444748';
  const gridColor = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  // Shared options for horizontal bar charts
  const barOptions = (valueLabel: string) => ({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'bar'>) => ` ${ctx.parsed.x} ${valueLabel}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        border: { display: false },
        ticks: { color: textColor, font: { size: 11 } },
      },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: textColor, font: { size: 11 } },
      },
    },
  });

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: textColor,
          font: { size: 11 },
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 8,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'doughnut'>) => {
            const data = ctx.dataset.data as number[];
            const total = data.reduce((a, b) => a + b, 0);
            const value = data[ctx.dataIndex];
            const pct = Math.round((value / total) * 100);
            return ` ${ctx.label}: ${value} (${pct}%)`;
          },
        },
      },
    },
  };

  const internacionales = stats.byExperience.find((e) => e.label === 'internacional')?.value ?? 0;

  return (
    <div className="space-y-4">
      {/* Headline numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Artistas en el índice" value={stats.total} />
        <StatCard label="Internacionales"       value={internacionales} accent="text-comic-red" />
        <StatCard label="Con imagen"            value={stats.withImage} />
        <StatCard label="Géneros únicos"        value={stats.uniqueGenres} />
      </div>

      {/* Experience doughnut + Roles bar */}
      <div className="grid md:grid-cols-3 gap-4">
        <ChartCard title="Nivel de experiencia" ariaLabel={`Gráfico de nivel de experiencia: ${stats.byExperience.map((e) => `${formatLabel(e.label)} ${e.value}`).join(', ')}`}>
          <div style={{ height: 220 }}>
            <Doughnut
              key={String(dark)}
              data={{
                labels: stats.byExperience.map((e) => formatLabel(e.label)),
                datasets: [{
                  data: stats.byExperience.map((e) => e.value),
                  backgroundColor: [YELLOW, RED],
                  borderWidth: 0,
                }],
              }}
              options={doughnutOptions}
            />
          </div>
        </ChartCard>

        <ChartCard title="Roles" className="md:col-span-2" ariaLabel={`Gráfico de roles: ${stats.byRole.map((r) => `${formatLabel(r.label)} ${r.value}`).join(', ')}`}>
          <div style={{ height: 220 }}>
            <Bar
              key={`roles-${dark}`}
              data={{
                labels: stats.byRole.map((r) => formatLabel(r.label)),
                datasets: [{
                  data: stats.byRole.map((r) => r.value),
                  backgroundColor: YELLOW,
                  borderWidth: 0,
                  borderRadius: 2,
                }],
              }}
              options={barOptions('artistas')}
            />
          </div>
        </ChartCard>
      </div>

      {/* Top genres */}
      <ChartCard title="Géneros más frecuentes" ariaLabel={`Gráfico de géneros más frecuentes: ${stats.byGenre.map((g) => `${formatLabel(g.label)} ${g.value}`).join(', ')}`}>
        <div style={{ height: stats.byGenre.length * 32 + 24 }}>
          <Bar
            key={`genres-${dark}`}
            data={{
              labels: stats.byGenre.map((g) => formatLabel(g.label)),
              datasets: [{
                data: stats.byGenre.map((g) => g.value),
                backgroundColor: BLUE,
                borderWidth: 0,
                borderRadius: 2,
              }],
            }}
            options={barOptions('artistas')}
          />
        </div>
      </ChartCard>

      {/* Publications — only when data exists */}
      {stats.byPublication.length > 0 && (
        <ChartCard title="Publicaciones internacionales" ariaLabel={`Gráfico de publicaciones internacionales: ${stats.byPublication.map((p) => `${p.label} ${p.value}`).join(', ')}`}>
          <div style={{ height: stats.byPublication.length * 36 + 24 }}>
            <Bar
              key={`pub-${dark}`}
              data={{
                labels: stats.byPublication.map((p) => p.label),
                datasets: [{
                  data: stats.byPublication.map((p) => p.value),
                  backgroundColor: RED,
                  borderWidth: 0,
                  borderRadius: 2,
                }],
              }}
              options={barOptions('artistas')}
            />
          </div>
        </ChartCard>
      )}
    </div>
  );
}
