import type { Artist } from '@/lib/types';

interface ArtistCardProps {
  artist: Artist;
  onClick: (artist: Artist) => void;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function ArtistCard({ artist, onClick }: ArtistCardProps) {
  const primaryLink =
    artist.websites?.website ||
    artist.websites?.portfolio ||
    artist.websites?.behance ||
    artist.websites?.artstation ||
    (artist.social_media?.instagram
      ? `https://instagram.com/${artist.social_media.instagram.replace('@', '')}`
      : null) ||
    (artist.social_media?.twitter
      ? `https://twitter.com/${artist.social_media.twitter.replace('@', '')}`
      : null) ||
    (artist.social_media?.facebook
      ? `https://facebook.com/${artist.social_media.facebook.replace('@', '')}`
      : null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(artist);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${artist.name}`}
      onClick={() => onClick(artist)}
      onKeyDown={handleKeyDown}
      className="group flex flex-col space-y-4 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-comic-red"
    >
      {/* Image */}
      {artist.images?.featured?.url && (
        <div className="aspect-[4/5] overflow-hidden rounded-xl bg-surface-container-low">
          <img
            src={`${BASE_PATH}${artist.images.featured.url}`}
            alt={artist.images.featured.alt || artist.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
        </div>
      )}

      {/* Info */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight text-on-surface leading-snug min-w-0 transition-colors duration-200 group-hover:text-comic-red">
          {artist.name}
        </h2>
        <p className="text-sm text-on-surface-variant leading-relaxed font-body line-clamp-3">
          {artist.bio}
        </p>
        {primaryLink && (
          <a
            href={primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver portafolio de ${artist.name}`}
            className="inline-block text-[0.6875rem] uppercase tracking-widest text-comic-red hover:text-on-surface transition-colors font-label py-1"
            onClick={(e) => e.stopPropagation()}
          >
            Ver portafolio →
          </a>
        )}
      </div>
    </div>
  );
}
