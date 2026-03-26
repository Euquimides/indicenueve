import type { Artist } from './types';
import { genreKey } from './artists';

export interface StatEntry {
  label: string;
  value: number;
}

export interface ArtistStats {
  total: number;
  withImage: number;
  withWebsite: number;
  withAwards: number;
  uniqueGenres: number;
  byExperience: StatEntry[];
  byRole: StatEntry[];
  byGenre: StatEntry[];      // top 12 by count
  byPublication: StatEntry[]; // international publishers
}

function countBy(artists: Artist[], getKeys: (a: Artist) => string[]): StatEntry[] {
  const counts: Record<string, number> = {};
  for (const artist of artists) {
    for (const key of getKeys(artist)) {
      counts[key] = (counts[key] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

export function formatLabel(s: string): string {
  return s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function computeStats(artists: Artist[]): ArtistStats {
  const allGenres = countBy(artists, (a) => (a.genres ?? []).map(genreKey));
  return {
    total: artists.length,
    withImage: artists.filter((a) => !!a.images?.featured?.url).length,
    withWebsite: artists.filter(
      (a) => !!(a.websites?.website || a.websites?.portfolio || a.websites?.behance || a.websites?.artstation)
    ).length,
    withAwards: artists.filter((a) => (a.awards?.length ?? 0) > 0).length,
    uniqueGenres: allGenres.length,
    byExperience: countBy(artists, (a) => [a.experience_level]),
    byRole: countBy(artists, (a) => a.roles ?? []),
    byGenre: allGenres.slice(0, 12),
    byPublication: countBy(
      artists.filter((a) => (a.publications?.length ?? 0) > 0),
      (a) => a.publications ?? []
    ),
  };
}
