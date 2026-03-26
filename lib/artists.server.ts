import fs from 'fs';
import path from 'path';
import type { Artist, ArtistsData } from './types';

// Server-only — uses Node.js fs. Do not import from client components.
export function loadArtistsFromFile(): Artist[] {
  const filePath = path.join(process.cwd(), 'public', 'data', 'comic_artist_index.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data: ArtistsData = JSON.parse(raw);
  return data.artists || [];
}
