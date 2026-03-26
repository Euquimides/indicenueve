# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Comic CR Index** is a static web application indexing Costa Rican comic artists. It is built with Next.js 14+ (App Router), TypeScript, Tailwind CSS, and Lunr.js for client-side search. The site deploys as fully static HTML to GitHub Pages — no backend, no server-side logic.

## Commands

```bash
npm run dev          # Start local dev server (http://localhost:3000)
npm run build        # Build search index + Next.js static export to out/
npm run serve        # Preview static export locally on port 8080
npm run lint         # Run ESLint
npm run type-check   # TypeScript check without emitting
```

The `build` script runs `scripts/build-search-index.js` first (generates `public/data/lunr-index.json` and `public/data/search-data.json`), then `next build`. The static export lands in `out/` automatically because `next.config.js` sets `output: 'export'`.

## Architecture

### Data Flow

1. **Source data**: `public/data/comic_artist_index.json` — the canonical artist database
2. **Build step**: `scripts/build-search-index.js` pre-builds a Lunr index into `public/data/`
3. **Server render**: `app/page.tsx` calls `lib/artists.server.ts` (Node.js `fs`, server-only) to pass `initialArtists` to `ArtistGrid`
4. **Client runtime**: `ArtistGrid.tsx` builds a Lunr index in the browser from `initialArtists` on mount, then handles search and filter entirely client-side

### Key Directories

- `app/` — Next.js App Router: `/` (home), `/acerca-de` (about), `not-found`
- `components/` — React components: `ArtistGrid` (search + filter + grid), `ArtistCard`, `ArtistModal`, `Navbar`, `EmptyState`
- `lib/` — `types.ts` (Artist/SearchFilters/SearchResult/Work interfaces), `artists.server.ts` (server-only fs loader), `artists.ts` (client-safe utilities, e.g. `getAllGenres`), `constants.ts`
- `public/data/` — Artist JSON and generated Lunr index (both committed to repo)
- `scripts/` — Build-time Node.js scripts

### Static Export Config

`next.config.js` uses `output: 'export'` with `basePath: process.env.NEXT_PUBLIC_BASE_PATH || ''` (empty for custom domain). Images must use `unoptimized: true`.

### Server/Client Split

`lib/artists.server.ts` uses Node.js `fs` and must only be imported from Server Components (e.g. `app/page.tsx`). `lib/artists.ts` is client-safe. Never import `artists.server.ts` from a `'use client'` component.

## Data Schema

Artist objects require: `id`, `name`, `location`, `bio`, `roles`, `genres`, `experience_level`.

- `roles` enum: `"dibujante" | "ilustrador" | "escritor" | "animador"`
- `experience_level` enum: `"local" | "nacional" | "internacional"`
- Optional: `social_media` (instagram, twitter, facebook), `websites` (portfolio, behance, website, artstation), `publications`, `awards`, `images`

The schema also defines a `works` array (currently empty) for future comic works data. See `mockup/schema.json` for full JSON Schema definition.

## Design System

Material Design-inspired token system (not comic-book aesthetic):

- **Colors** (defined in `tailwind.config.js`): `primary` (#171818), `secondary` (#3f627b), `surface` (#f9f9f9), `on-surface` (#1a1c1c), `on-surface-variant` (#444748), `outline` / `outline-variant`, `error` (#ba1a1a), plus `surface-container-*` scale
- **Typography**: Inter via `next/font/google`, exposed as CSS var `--font-inter`; Tailwind font families `headline`, `body`, `label` all resolve to Inter
- **Border radius**: very subtle (`DEFAULT: 0.125rem`, `lg: 0.25rem`) — nearly square
- Use the semantic token names (`text-on-surface`, `bg-surface-container-low`, `border-outline-variant`, etc.) rather than raw hex values

## Search Implementation

Lunr.js index is built **at runtime in the browser** inside `ArtistGrid.tsx` on component mount (dynamic `import('lunr')`). Search fields: `name` (boosted 10x), `bio`, `location`, `roles`, `genres`. Search activates at ≥2 characters and appends a wildcard (`query + '*'`). Filters for `genre`, `level`, and `role` are applied on top of Lunr results and work independently or in combination.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds on push to `main` and deploys the `out/` directory to GitHub Pages. Repo: `https://github.com/Euquimides/indicenueve`. Custom domain: `https://indicenueve.com`.
