# ThinksToDo — Astro + Supabase

A business-listings site with authentication, listing CRUD, search, bookings, and reviews. Astro 6 SSR + Supabase (auth + Postgres + storage), deployed on Vercel.

## Quick start

```bash
pnpm install
cp .env.example .env.local        # then fill in the three Supabase values
pnpm dev                          # http://localhost:4321
```

## Environment variables

Populate `.env.local` (gitignored) with values from Supabase → **Project Settings → API**:

| Variable | Where it's used | Exposed to browser? |
|---|---|---|
| `PUBLIC_SUPABASE_URL` | Server + browser Supabase clients | Yes (safe) |
| `PUBLIC_SUPABASE_ANON_KEY` | Server + browser | Yes — RLS policies protect data |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only (image upload, admin tasks) | **No — bypasses RLS. Never commit.** |

The exact same three variables must be set in **Vercel → Project Settings → Environment Variables** for deployment.

## Database

Schema, seed data, and storage bucket live in [`supabase/migrations/`](./supabase/migrations/):

- `0001_init.sql` — tables (profiles, listings, bookings, reviews, bookmarks, etc.) with RLS policies
- `0002_seed.sql` — 10 categories + 10 amenities
- `0003_storage.sql` — `listing-images` bucket + storage policies

Apply against a linked Supabase project:

```bash
pnpm dlx supabase link --project-ref <your-ref>
pnpm dlx supabase db push
```

Regenerate `src/lib/supabase/types.ts` after schema changes:

```bash
pnpm dlx supabase gen types typescript --linked > src/lib/supabase/types.ts
```

### Auth settings

One Supabase setting is not captured in migrations — set it via the dashboard (Authentication → Providers → Email) or the Management API:

```bash
# Disable email confirmation (signups are auto-confirmed → immediate login).
curl -X PATCH \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mailer_autoconfirm": true}' \
  https://api.supabase.com/v1/projects/<project-ref>/config/auth
```

Flip `mailer_autoconfirm` back to `false` whenever you want real email verification in production.

## Routes

### Public
- `/` — home with hero search and featured listings
- `/listings/`, `/listings-grid/`, `/listings-map/` — three browse views
- `/listing/<slug>/` — detail page with reviews + booking CTA
- `/search?q=&category=&city=` — filtered search results
- `/about-us/`, `/contact-us/`, `/faq/`, `/privacy-policy/`, `/help-center/`, `/blog/`

### Auth
- `/login/`, `/register/`, `/forgot-password/`, `/reset-password/`
- `/api/auth/{signin,signup,signout,forgot-password,callback}` — form-POST endpoints

### Dashboard (protected — middleware redirects to `/login/` when unauthed)
- `/dashboard-user/`, `/dashboard-my-profile/`
- `/dashboard-my-listings/`, `/dashboard-add-listing/`
- `/dashboard-my-bookings/`, `/dashboard-bookmarks/`, `/dashboard-reviews/`

### API
- `POST /api/listings` — create listing (with image upload)
- `POST /api/listings/[id]` — `_action=publish|unpublish|delete`
- `POST /api/bookmarks/[listing_id]` — `_action=toggle|add|remove`
- `POST /api/bookings` — create booking request
- `POST /api/reviews` — upsert a review, recalculate listing rating

## Deploy to Vercel

1. Import this GitHub repo at <https://vercel.com/new>.
2. Framework preset: **Astro** (auto-detected; uses `@astrojs/vercel`).
3. Add the three env vars above in **Project Settings → Environment Variables** for Production + Preview + Development.
4. First deploy runs automatically.

## Architecture notes

- `src/middleware.ts` hydrates the session on every SSR request and guards `/dashboard-*` and `/api/*` (except `/api/auth/*`).
- Most pages are SSR (`export const prerender = false`). Purely static marketing pages stay prerendered for CDN caching.
- The template's 3,000+ line `src/lib/data/context.ts` is now only used for cosmetic secondary data (categories3 sidebar, blog posts, etc.). All listing data comes from Supabase.
- Image uploads use a service-role client to bypass RLS writes (ownership is validated at the API layer first).

## Local tooling

```bash
pnpm dev            # dev server with HMR
pnpm build          # production build → dist/ + .vercel/output/
pnpm preview        # serve the build locally
pnpm astro check    # typecheck .astro files
```
