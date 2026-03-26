'use client';
import type { SearchFilters } from '@/lib/types';

interface FilterBarProps {
  query: string;
  filters: SearchFilters;
  genres: string[];
  onQueryChange: (q: string) => void;
  onFiltersChange: (f: SearchFilters) => void;
  totalResults: number;
}

function formatGenre(g: string) {
  return g.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function FilterBar({
  query,
  filters,
  genres,
  onQueryChange,
  onFiltersChange,
  totalResults,
}: FilterBarProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 mt-6 mb-2">
      {/* Search input */}
      <div className="relative mb-4">
        <input
          type="text"
          id="search-input"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Busca por nombre, género, rol o editorial..."
          className="w-full px-5 py-4 text-lg font-dm-sans border-2 border-comic-ink shadow-comic-input focus:shadow-comic-input-focus focus:-translate-x-0.5 focus:-translate-y-0.5 outline-none transition-all motion-reduce:transition-none bg-comic-white text-comic-ink placeholder-gray-400"
          aria-label="Buscar artistas"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={filters.genre || ''}
          onChange={(e) => onFiltersChange({ ...filters, genre: e.target.value || undefined })}
          className="border-2 border-comic-ink px-3 py-2 text-sm font-bold uppercase bg-comic-white shadow-comic text-comic-ink outline-none cursor-pointer hover:bg-comic-light-gray transition-colors"
          aria-label="Filtrar por género"
        >
          <option value="">Todos los géneros</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {formatGenre(g)}
            </option>
          ))}
        </select>

        <select
          value={filters.level || ''}
          onChange={(e) => onFiltersChange({ ...filters, level: e.target.value || undefined })}
          className="border-2 border-comic-ink px-3 py-2 text-sm font-bold uppercase bg-comic-white shadow-comic text-comic-ink outline-none cursor-pointer hover:bg-comic-light-gray transition-colors"
          aria-label="Filtrar por nivel"
        >
          <option value="">Todos los niveles</option>
          <option value="nacional">Nacional</option>
          <option value="internacional">Internacional</option>
        </select>

        {(query || filters.genre || filters.level) && (
          <button
            onClick={() => { onQueryChange(''); onFiltersChange({}); }}
            className="border-2 border-comic-ink px-3 py-2 text-sm font-bold uppercase bg-comic-white text-comic-ink hover:bg-comic-light-gray transition-colors"
          >
            Limpiar
          </button>
        )}

        <span className="ml-auto text-sm text-gray-500 font-semibold tabular-nums">
          {totalResults} artista{totalResults !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}
