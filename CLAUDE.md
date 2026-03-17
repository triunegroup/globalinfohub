# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (usually http://localhost:3001 if 3000 is taken)
npm run build    # Production build — always run before pushing to catch TS errors
npm run lint     # ESLint check
```

## Deployment

Push to `main` → auto-deploys to **https://globalinfohub.vercel.app/** via Vercel. Always run `npm run build` locally first — Vercel enforces strict TypeScript checking.

## Architecture

Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS v4. No database, no auth. Dark theme only (`globals.css` CSS variables: `--bg-primary`, `--bg-secondary`, `--bg-card`, `--border`). Custom utility classes: `.card`, `.sidebar-link`, `.scrollbar-thin`, `.prose-dark` (blog MDX), `.animate-ticker` (breaking news).

---

## Data Sources

### `lib/feeds.ts` — single source of truth for all feed URLs
- `RSS_FEEDS[category][region][]` — nested by category (`technology`, `global-news`, `markets`, `sports`, `real-estate`) then region (`americas`, `european`, `asian`, `african`, `caribbean`)
- `VIDEO_FEEDS[]` — 7 YouTube live channels; BBC is index 0 (default). Each entry has `id`, `title`, `channelHandle`, `embedUrl` (fallback), `source`, `liveUrl`
- `CRYPTO_FEEDS[]` — standalone array for crypto news RSS sources

### `lib/blog.ts` — blog utilities
- `getAllPosts()` — reads all `.mdx` files from `content/blog/`, parses frontmatter, returns sorted by date desc
- `getPost(slug)` — returns `{ meta, content }` for a single post
- `CATEGORY_STYLES` — badge colors keyed by category string
- `CATEGORY_FEEDS` — maps blog post category → RSS feed array used in the related news sidebar

### `lib/types.ts` — shared types: `FeedItem`, `StockData`, `VideoFeed`, `Region`, `Category`

---

## API Routes (`app/api/`)

All routes are no-auth, server-side only. Cache strategy noted per route.

| Route | Purpose | Cache |
|---|---|---|
| `/api/rss?url=` | Fetch + parse RSS/Atom via `xml2js`. Extracts images from `media:content`, `media:thumbnail`, `enclosure`, `content:encoded`. Returns up to 10 items. | 5 min |
| `/api/stock?symbol=` | Yahoo Finance stock quotes | none |
| `/api/search?q=` | DuckDuckGo instant answers + search redirect links | none |
| `/api/livestream?handle=` | Resolves current YouTube live stream ID from `@handle/live` page. Falls back to static `embedUrl` on failure. | 5 min |
| `/api/crypto` | CoinGecko `/coins/markets` top 30. Pins `bitcoin`, `ethereum`, `ripple` to positions 1–3, rest by market cap. | 2 min |
| `/api/geocode?city=` | Open-Meteo geocoding — city name → lat/lon | 24 hr |
| `/api/weather?lat=&lon=&units=` | Open-Meteo forecast — current conditions + 7-day. `units` = `fahrenheit` or `celsius` | 5 min |
| `/api/breaking` | Fetches BBC, AP, NPR, Guardian, Al Jazeera, Reuters, DW in parallel via `xml2js`. Merges and sorts by pubDate, returns top 24. | 2 min (`export const revalidate = 120`) |

---

## Key Components

**`components/Sidebar.tsx`** — `NAV` array drives all nav items. Items with `sub: []` render as plain links (no chevron). Items with sub-items get an expand/collapse chevron. Desktop supports icon-only collapsed state; mobile uses a slide-in drawer.

**`components/Header.tsx`** — Search bar with a category `<select>` that scopes queries before hitting `/api/search`. Stock ticker pattern (`/^[A-Z]{1,5}(\.[A-Z]{1,2})?$/`) auto-routes to `/api/stock` instead. Results panel shows category-scoped external links + source quick-links.

**`components/FeedSection.tsx`** — client component, fetches multiple RSS sources in parallel via `/api/rss`, sorts by date, handles loading/error states. Used by all category pages and the blog sidebar.

**`components/VideoPanel.tsx`** — renders `VIDEO_FEEDS[0]` by default. Resolves live stream ID via `/api/livestream`, falls back to static `embedUrl`.

**`components/BreakingNews.tsx`** — client component on homepage. Fetches `/api/breaking` on mount, auto-refreshes every 2 min. Renders: (1) CSS ticker strip (`animate-ticker` keyframe, pauses on hover, items duplicated for seamless loop), (2) 8-card trending grid with source color badges and `timeAgo()` timestamps.

**`components/RegionTabs.tsx`** — reads `?region=` URL param, renders tab strip. Used by all category pages.

**`components/MarketHeatmap.tsx`** — TradingView S&P 500 embed.

---

## Pages

All category pages follow the same pattern: import feeds from `RSS_FEEDS`, render `<RegionTabs>` + `<FeedSection sources={feeds[region]} />`.

**`/weather`** — client component. City search → `/api/geocode` → `/api/weather`. Persists last city + units (`fahrenheit`/`celsius`) in `localStorage`. World cities grid fetches all 8 cities in parallel; clicking one loads it as the main city.

**`/crypto`** — client component. Fetches `/api/crypto` on mount with Refresh button. Price table with inline SVG sparklines (normalized 7-day price arrays, downsampled to ~40 points). `FeedSection` with `CRYPTO_FEEDS` below.

**`/blog`** — static. `getAllPosts()` at build time. Featured post (index 0) + grid of remainder.

**`/blog/[slug]`** — SSG via `generateStaticParams`. MDX rendered with `next-mdx-remote/rsc`. Layout: 2-col on desktop — article left, related news sidebar right (`FeedSection` using `CATEGORY_FEEDS[post.category]`).

---

## Blog Content

Posts live in `content/blog/*.mdx`. Frontmatter fields:

```yaml
title: ""
date: "YYYY-MM-DD"      # controls sort order
excerpt: ""
category: ""            # crypto | markets | technology | global-affairs | real-estate | sports | caribbean
author: ""
readTime: 5             # integer, minutes
```

To add a post: create the `.mdx` file, push — Vercel builds and deploys it automatically. To remove: delete the file and push.

---

## Analytics

`@vercel/analytics` (`<Analytics />`) and `@vercel/speed-insights` (`<SpeedInsights />`) are mounted in `app/layout.tsx`. Data visible in the Vercel dashboard under the project's Analytics tab. No configuration required.
