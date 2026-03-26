'use client';
import { useEffect, useRef } from 'react';
import type { Artist } from '@/lib/types';
import { EXPERIENCE_LABELS } from '@/lib/constants';

interface ArtistModalProps {
  artist: Artist | null;
  onClose: () => void;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

function formatGenre(g: string) {
  return g.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ArtistModal({ artist, onClose }: ArtistModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    if (artist) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
      closeRef.current?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [artist, onClose]);

  if (!artist) return null;

  const instagramUrl = artist.social_media?.instagram
    ? `https://instagram.com/${artist.social_media.instagram.replace('@', '')}`
    : null;
  const twitterUrl = artist.social_media?.twitter
    ? `https://twitter.com/${artist.social_media.twitter.replace('@', '')}`
    : null;
  const facebookUrl = artist.social_media?.facebook
    ? `https://facebook.com/${artist.social_media.facebook.replace('@', '')}`
    : null;

  const links = [
    instagramUrl                && { label: 'Instagram',  href: instagramUrl },
    twitterUrl                  && { label: 'Twitter',    href: twitterUrl },
    facebookUrl                 && { label: 'Facebook',   href: facebookUrl },
    artist.websites?.website    && { label: 'Sitio Web',  href: artist.websites.website },
    artist.websites?.portfolio  && { label: 'Portafolio', href: artist.websites.portfolio },
    artist.websites?.behance    && { label: 'Behance',    href: artist.websites.behance },
    artist.websites?.artstation && { label: 'ArtStation', href: artist.websites.artstation },
  ].filter(Boolean) as { label: string; href: string }[];

  const levelLabel = EXPERIENCE_LABELS[artist.experience_level];
  const showLocation =
    artist.location &&
    artist.location.toLowerCase() !== (levelLabel ?? '').toLowerCase();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-primary/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="bg-surface-container-lowest rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
        style={{ boxShadow: 'var(--shadow-modal)' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="px-5 pt-6 pb-5 sm:px-8 sm:pt-8 sm:pb-6">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h2
                id="modal-title"
                className="text-2xl font-bold tracking-tight text-on-surface leading-snug"
              >
                {artist.name}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[0.6875rem] uppercase tracking-widest text-outline font-label">
                  {levelLabel}
                </span>
                {showLocation && (
                  <>
                    <span className="text-outline-variant" aria-hidden="true">·</span>
                    <span className="text-[0.6875rem] uppercase tracking-widest text-outline font-label">
                      {artist.location}
                    </span>
                  </>
                )}
              </div>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Cerrar"
              className="text-outline hover:text-on-surface transition-colors text-xl leading-none shrink-0 w-11 h-11 flex items-center justify-center rounded-lg hover:bg-surface-container"
            >
              ×
            </button>
          </div>
        </div>

        {/* Featured image */}
        {artist.images?.featured?.url && (
          <div className="px-5 sm:px-8 mb-6">
            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-surface-container-low">
              <img
                src={`${BASE_PATH}${artist.images.featured.url}`}
                alt={artist.images.featured.alt || artist.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="px-5 pb-6 sm:px-8 sm:pb-8 space-y-6">
          {/* Roles */}
          <div className="flex flex-wrap gap-2">
            {artist.roles?.map((role) => (
              <span
                key={role}
                className="text-[0.6875rem] uppercase tracking-widest bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full font-label"
              >
                {role}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p className="text-sm text-on-surface-variant leading-relaxed font-body">
            {artist.bio}
          </p>

          {/* Genres */}
          {artist.genres && artist.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {artist.genres.map((genre) => (
                <span
                  key={genre}
                  className="text-[0.6875rem] uppercase tracking-widest bg-surface-container-low text-outline px-3 py-1 rounded-full font-label"
                >
                  {formatGenre(genre)}
                </span>
              ))}
            </div>
          )}

          {/* Publications */}
          {artist.publications && artist.publications.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-on-surface-variant mb-2">
                Publicaciones
              </p>
              <div className="flex flex-wrap gap-2">
                {artist.publications.map((pub) => (
                  <span
                    key={pub}
                    className="text-[0.6875rem] uppercase tracking-widest bg-surface-container text-on-surface-variant px-3 py-1 rounded-full font-label"
                  >
                    {pub}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {artist.awards && artist.awards.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-on-surface-variant mb-2">
                Premios
              </p>
              <ul className="space-y-1">
                {artist.awards.map((award) => (
                  <li key={award} className="text-sm text-on-surface-variant font-body">
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          {links.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-2 border-t border-outline-variant/20">
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.6875rem] uppercase tracking-widest text-comic-red hover:text-on-surface transition-colors font-label"
                >
                  {label} →
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
