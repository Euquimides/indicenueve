'use client';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { Artist, SearchFilters } from '@/lib/types';
import { getAllGenres, genreKey } from '@/lib/artists';
import ArtistCard from './ArtistCard';
import ArtistModal from './ArtistModal';
import EmptyState from './EmptyState';

const ROLES = [
  { value: '', label: 'Todos los roles' },
  { value: 'dibujante', label: 'Dibujante' },
  { value: 'ilustrador', label: 'Ilustrador' },
  { value: 'escritor', label: 'Escritor' },
  { value: 'animador', label: 'Animador' },
];

const LEVELS = [
  { value: '', label: 'Todos los niveles' },
  { value: 'nacional', label: 'Nacional' },
  { value: 'internacional', label: 'Internacional' },
];

function formatGenre(g: string) {
  return g.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

interface DropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function FilterDropdown({ label, value, options, onChange, isOpen, onToggle, onClose }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const activeLabel = options.find((o) => o.value === value)?.label ?? label;
  const isFiltered = value !== '';

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  const focusMenuItem = (index: number) => {
    const items = menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
    items?.[index]?.focus();
  };

  const handleToggleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) onToggle();
      setTimeout(() => focusMenuItem(e.key === 'ArrowDown' ? 0 : options.length - 1), 0);
    }
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); focusMenuItem(Math.min(index + 1, options.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focusMenuItem(Math.max(index - 1, 0)); }
    else if (e.key === 'Escape') { onClose(); }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        onKeyDown={handleToggleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={`flex items-center gap-2 text-[0.6875rem] uppercase tracking-widest font-label px-4 py-2 border transition-colors ${
          isFiltered
            ? 'border-comic-yellow bg-comic-yellow text-primary'
            : 'border-outline-variant/40 bg-surface-container-low text-on-surface-variant hover:border-outline hover:text-on-surface'
        }`}
      >
        {activeLabel}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          className="absolute top-full left-0 mt-1 z-30 bg-surface-container-lowest border border-outline-variant/20 min-w-[160px]"
          style={{ boxShadow: 'var(--shadow-dropdown)' }}
        >
          {options.map((opt, i) => (
            <button
              key={opt.value}
              role="menuitem"
              onKeyDown={(e) => handleMenuKeyDown(e, i)}
              onClick={() => { onChange(opt.value); onClose(); }}
              className={`block w-full text-left px-4 py-2.5 text-[0.6875rem] uppercase tracking-widest font-label transition-colors ${
                opt.value === value
                  ? 'text-on-surface font-bold bg-surface-container-low'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface ArtistGridProps {
  initialArtists: Artist[];
}

export default function ArtistGrid({ initialArtists }: ArtistGridProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [lunrIdx, setLunrIdx] = useState<any>(null);
  const [searchReady, setSearchReady] = useState(false);

  useEffect(() => {
    import('lunr').then(({ default: lunr }) => {
      const idx = lunr(function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any).field('name', { boost: 10 });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any).field('bio');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any).field('location');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any).field('roles');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any).field('genres');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any).ref('id');
        initialArtists.forEach((a) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this as any).add({
            id: a.id,
            name: a.name,
            bio: a.bio || '',
            location: a.location || '',
            roles: (a.roles || []).join(' '),
            genres: (a.genres || []).join(' '),
          });
        });
      });
      setLunrIdx(idx);
      setSearchReady(true);
    });
  }, [initialArtists]);

  const allGenres = useMemo(() => getAllGenres(initialArtists), [initialArtists]);

  const genreOptions = useMemo(() => [
    { value: '', label: 'Todos los géneros' },
    ...allGenres.map((g) => ({ value: g, label: formatGenre(g) })),
  ], [allGenres]);

  const results = useMemo(() => {
    let list = initialArtists;
    if (query.length >= 2 && lunrIdx) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hits: any[] = lunrIdx.search(query + '*');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ids = new Set(hits.map((h: any) => h.ref));
        list = initialArtists.filter((a) => ids.has(a.id));
      } catch { /* list stays as initialArtists */ }
    }
    // Always keep only artists with a featured image (applied after Lunr so it's never bypassed)
    list = list.filter((a) => !!a.images?.featured?.url);
    if (filters.genre) list = list.filter((a) => a.genres?.some(g => genreKey(g) === genreKey(filters.genre!)));
    if (filters.level) list = list.filter((a) => a.experience_level === filters.level);
    if (filters.role) list = list.filter((a) => a.roles?.includes(filters.role!));
    return list;
  }, [initialArtists, query, filters, lunrIdx]);

  const handleCardClick = useCallback((artist: Artist) => setSelectedArtist(artist), []);
  const handleModalClose = useCallback(() => setSelectedArtist(null), []);

  const toggle = (key: string) => setOpenDropdown((o) => (o === key ? null : key));
  const close = () => setOpenDropdown(null);
  const hasActiveFilters = !!(query || filters.genre || filters.level || filters.role);

  return (
    <>
      <div className="pt-16 min-h-screen">
        <main className="px-5 sm:px-8 md:px-12 lg:px-20 py-12 lg:py-20 bg-surface">
          {/* Search */}
          <div className="max-w-[900px] mx-auto mb-8 lg:mb-10 lg:pt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchReady ? 'Buscar por artistas, editoriales...' : 'Cargando índice…'}
              aria-label="Buscar artistas"
              className="w-full bg-transparent border-b-2 border-outline/10 py-3 sm:py-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-on-surface focus:outline-none focus:border-comic-yellow placeholder:text-outline/20 transition-colors"
            />

            {/* Filter dropdowns */}
            <div className="flex flex-wrap items-center gap-2 mt-6">
              <FilterDropdown
                label="Rol"
                value={filters.role || ''}
                options={ROLES}
                onChange={(v) => setFilters((f) => ({ ...f, role: v || undefined }))}
                isOpen={openDropdown === 'role'}
                onToggle={() => toggle('role')}
                onClose={close}
              />
              <FilterDropdown
                label="Nivel"
                value={filters.level || ''}
                options={LEVELS}
                onChange={(v) => setFilters((f) => ({ ...f, level: v || undefined }))}
                isOpen={openDropdown === 'level'}
                onToggle={() => toggle('level')}
                onClose={close}
              />
              <FilterDropdown
                label="Género"
                value={filters.genre || ''}
                options={genreOptions}
                onChange={(v) => setFilters((f) => ({ ...f, genre: v || undefined }))}
                isOpen={openDropdown === 'genre'}
                onToggle={() => toggle('genre')}
                onClose={close}
              />

              {hasActiveFilters && (
                <button
                  onClick={() => { setQuery(''); setFilters({}); close(); }}
                  className="text-[0.6rem] uppercase tracking-widest text-comic-red hover:opacity-70 font-label transition-opacity ml-2 px-2 py-2"
                >
                  Limpiar
                </button>
              )}

            </div>
          </div>

          {/* Accessible live region for search result announcements */}
          <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            {searchReady && hasActiveFilters
              ? `${results.length} artista${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`
              : ''}
          </div>

          {/* Grid */}
          <div className="max-w-[1200px] mx-auto pb-24">
            {results.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                {results.map((artist, i) => (
                  <div key={artist.id} className={i % 2 === 1 ? 'md:mt-10' : ''}>
                    <ArtistCard artist={artist} onClick={handleCardClick} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <ArtistModal artist={selectedArtist} onClose={handleModalClose} />
    </>
  );
}
