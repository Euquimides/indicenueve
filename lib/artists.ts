import type { Artist } from './types';

// Client-safe utility — no Node.js imports

/**
 * Comparison key for genres: strips diacritics, trims, lowercases.
 * Use this for deduplication and filter matching so that
 * "humor_gráfico" and "humor_grafico" resolve to the same key.
 */
export function genreKey(g: string): string {
  return g.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function getAllGenres(artists: Artist[]): string[] {
  const byKey = new Map<string, string>(); // genreKey → stored value
  artists.forEach(a =>
    a.genres?.forEach(g => {
      const key = genreKey(g);
      const val = g.trim().normalize('NFC').toLowerCase();
      // Prefer the accented form: overwrite only when current entry has no accents
      if (!byKey.has(key) || byKey.get(key) === key) {
        byKey.set(key, val);
      }
    })
  );
  return Array.from(byKey.values()).sort((a, b) => a.localeCompare(b, 'es'));
}
