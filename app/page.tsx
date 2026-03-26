import { loadArtistsFromFile } from '@/lib/artists.server';
import ArtistGrid from '@/components/ArtistGrid';

export default function HomePage() {
  const artists = loadArtistsFromFile();
  return <ArtistGrid initialArtists={artists} />;
}
