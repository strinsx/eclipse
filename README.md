# Eclipse

A Netflix-style streaming platform frontend for browsing and discovering movies and TV shows, powered by the TMDB API with user authentication and personalized watchlists via Supabase.

## Features

- **Browse** — popular, trending, top-rated, now-playing movies and TV series
- **Search** — combined movie and TV series search
- **Detail pages** — cast, credits, trailers, and similar content
- **User auth** — signup, login, logout via Supabase Auth
- **Multi-profile** — up to 4 profiles per account, including a kid-safe (PG-filtered) profile
- **Watchlists** — "Watch Later" lists per profile, persisted in Supabase
- **Recently watched** — per-profile tracking with rate limiting
- **Dark theme** — gold (#D4AF37) on dark (#0B0B0F) UI with responsive layout

## Tech Stack

| Layer | |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Framer Motion |
| **Icons** | Font Awesome 7 |
| **Auth / DB** | Supabase |
| **Data** | TMDB API |

## System Architecture

```
Browser
  │
  ▼
Next.js App Router
  ├── Server Components (layouts, pages, Navbar)
  ├── Client Components (panels, carousels, forms)
  │
  ├── Route Handlers (app/api/)
  │   ├── /api/auth/*         → Supabase Auth
  │   ├── /api/movies/*       → TMDB API (proxied)
  │   ├── /api/series/*       → TMDB API (proxied)
  │   └── /api/search         → TMDB API (proxied)
  │
  ├── Server Actions (app/actions.ts)
  │   └── selectProfile       → Sets profile cookie
  │
  ├── Auth Middleware (proxy.ts)
  │   └── Route protection & redirects
  │
  ├── lib/supabase/           → Supabase SSR client
  ├── lib/tmdb/               → TMDB API wrappers
  ├── lib/services/           → Business logic (auth, profiles, watchlists, recently)
  └── types/                  → Shared TypeScript interfaces
```

**Data flow:** Client components call Route Handlers (for TMDB data) or use Supabase client directly (for auth/DB operations). Server components fetch data at render time via Supabase server client or TMDB wrappers. Profile context flows through cookies set by server actions and read by middleware and server components.

## Getting Started

Copy `.env.local.example` to `.env.local` and fill in your TMDB API key and Supabase project credentials.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/
├── api/           # Route handlers (auth, movies, series, search)
├── auth/          # Login, signup, onboarding pages
├── homepage/      # Dashboard, search, movie/series detail pages
├── profile/       # Profile page and watchlists
├── components/    # UI components (navbar, cards, panels, forms)
├── lib/           # Supabase client, TMDB API wrappers, services
└── types/         # TypeScript interfaces
```

## Environment Variables

| Variable | Description |
|---|---|
| `TMDB_API_KEY` | The Movie Database API key |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous API key |

## Tradeoffs

- **No continue-watching progress tracking** — the open-source media player's query is rejected by CORS, so resume-playback state cannot be persisted per user.

## Learning

- Navigating and routing in Next.js App Router
- Designing and architecting a full-stack web system
- How data travels from database to UI and back
- Supabase Row-Level Security policies and authentication flows

## Future Improvements

- Rating buttons so users can personalize movie recommendations
- Genre filter controls on browse and search pages
