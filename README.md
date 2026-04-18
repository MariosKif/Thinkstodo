# ThinksToDo — Astro + Supabase

Astro 5/6 + React 19 islands frontend for ThinksToDo, replacing the Django demo at `../ListingHub_Django`.

## Prerequisites

- Node 22 LTS or newer (v23 also works; deploy on the current LTS).
- pnpm (`npm install -g pnpm@latest`)

## Install

```bash
pnpm install
```

## Run the dev server

```bash
pnpm dev
```

Serves at `http://localhost:4321/`. The Django reference app can keep running at `http://127.0.0.1:8000/` — different port, no conflict.

## Supabase setup (one-time, when you're ready)

The Astro app is pre-wired to talk to Supabase. It just needs three env values.

1. Create a free Supabase project at <https://supabase.com/dashboard>.
2. In the new project, go to **Settings → API**.
3. Copy these three values:
   - `Project URL` → paste into `PUBLIC_SUPABASE_URL` in `.env.local`
   - `anon public` key → paste into `PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → paste into `SUPABASE_SERVICE_ROLE_KEY`
4. Save `.env.local`. Restart `pnpm dev` once.

That's all. Every page / island that talks to Supabase will start working. Before Plan 1 runs database migrations, the project has no tables — data-reading pages will render but show empty states.

### What the three keys do

| Key | Where it's used | Exposed to browser? |
|---|---|---|
| `PUBLIC_SUPABASE_URL` | Both `src/lib/supabase/server.ts` and `browser.ts` | Yes (safe) |
| `PUBLIC_SUPABASE_ANON_KEY` | Both server and browser clients | Yes (safe — RLS protects data) |
| `SUPABASE_SERVICE_ROLE_KEY` | Only server-side (never in `src/components/*.tsx`) | **No — bypasses RLS. Keep it out of commits.** |

`.env.local` is gitignored; `.env.example` (committed) is the template.

## Project layout

- `src/pages/` — file-based routes (one file per URL).
- `src/layouts/Base.astro` — global `<head>` + nav + footer wrapper.
- `src/components/nav/` — Navbar (9 Django variants collapsed into one) + Footer.
- `src/components/<feature>/` — per-feature components, with `islands/` subfolders for React islands.
- `src/lib/supabase/` — server + browser Supabase client factories; `types.ts` is regenerated from `supabase gen types` in Plan 1.
- `public/assets/` — Bootstrap 5 theme CSS/JS/fonts/images copied verbatim from the Django project (206 files, ~18 MB).

## Porting status

| Page / feature | Status |
|---|---|
| All 36 static pages | ✅ Plan 2 |
| Navbar consolidation (9 variants → 1 component) | ✅ Plan 0 |
| Shared components (Subscribe, LoginModal, Cart, Search, Preloader, DashboardSidebar) | ✅ Plan 2 |
| Django context-processor data → `src/lib/data/context.ts` | ✅ Plan 2 |
| Dynamic routes (`single-listing-04/[slug]`, `blog-detail/[slug]`) | ✅ Plan 2 |
| Live Supabase data | ⏳ Plan 3 |
| Real auth (Supabase Auth + CSRF) | ⏳ Plan 4 |
| Dashboard CRUD (Supabase writes) | ⏳ Plan 5 |
| Map tiles + live search filter (Leaflet island) | ⏳ Plan 3/6 |
| Deploy (Vercel / Cloudflare) | ⏳ Plan 7 |

See `../docs/superpowers/plans/2026-04-18-astro-supabase-migration-overview.md` for the full roadmap.

## Running side-by-side with Django

Keep both servers running during the port:

```bash
# Terminal 1 — Django (reference)
cd ../ListingHub_Django && .venv/bin/python manage.py runserver   # :8000

# Terminal 2 — Astro (in progress)
cd ../thinkstodo-astro && pnpm dev                                 # :4321
```

Visually diff pages by opening the Django and Astro URLs side by side. That's the only "test" that matters for template parity.
