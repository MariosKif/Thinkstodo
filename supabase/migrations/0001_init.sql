-- Thinkstodo initial schema
-- Tables: profiles, categories, amenities, listings, listing_images, listing_amenities,
--         bookings, bookmarks, reviews, messages
-- RLS on every table. Policies scoped to auth.uid() or public-read where appropriate.

-- ============================================================================
-- Extensions
-- ============================================================================
create extension if not exists "pgcrypto";

-- ============================================================================
-- Enums
-- ============================================================================
do $$ begin
  create type listing_status as enum ('draft', 'published', 'archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type booking_status as enum ('pending', 'confirmed', 'cancelled', 'completed');
exception when duplicate_object then null; end $$;

-- ============================================================================
-- profiles — one row per auth.users row
-- ============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles read own or public" on public.profiles;
create policy "profiles read own or public" on public.profiles
  for select using (true);

drop policy if exists "profiles insert own" on public.profiles;
create policy "profiles insert own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles
  for update using (auth.uid() = id);

-- Auto-create a profile row when a new auth.users row appears.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- categories — lookup table (public read, admin writes)
-- ============================================================================
create table if not exists public.categories (
  id bigserial primary key,
  slug text unique not null,
  name text not null,
  icon text,
  sort_order int default 0
);

alter table public.categories enable row level security;

drop policy if exists "categories public read" on public.categories;
create policy "categories public read" on public.categories
  for select using (true);

-- ============================================================================
-- amenities — lookup table
-- ============================================================================
create table if not exists public.amenities (
  id bigserial primary key,
  key text unique not null,
  name text not null,
  icon text
);

alter table public.amenities enable row level security;

drop policy if exists "amenities public read" on public.amenities;
create policy "amenities public read" on public.amenities
  for select using (true);

-- ============================================================================
-- listings
-- ============================================================================
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  slug text unique not null,
  title text not null,
  description text,
  category_id bigint references public.categories(id) on delete set null,
  phone text,
  address text,
  city text,
  country text,
  lat numeric(10, 7),
  lng numeric(10, 7),
  price numeric(10, 2),
  price_tier smallint check (price_tier between 1 and 4),
  rating numeric(2, 1) check (rating between 0 and 5),
  review_count int default 0,
  is_featured boolean default false,
  is_verified boolean default false,
  status listing_status default 'draft',
  hero_image text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists listings_owner_idx on public.listings(owner_id);
create index if not exists listings_category_idx on public.listings(category_id);
create index if not exists listings_city_idx on public.listings(city);
create index if not exists listings_status_idx on public.listings(status);
create index if not exists listings_search_idx on public.listings
  using gin(to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce(city, '')));

alter table public.listings enable row level security;

drop policy if exists "listings public read published" on public.listings;
create policy "listings public read published" on public.listings
  for select using (status = 'published' or owner_id = auth.uid());

drop policy if exists "listings insert own" on public.listings;
create policy "listings insert own" on public.listings
  for insert with check (auth.uid() = owner_id);

drop policy if exists "listings update own" on public.listings;
create policy "listings update own" on public.listings
  for update using (auth.uid() = owner_id);

drop policy if exists "listings delete own" on public.listings;
create policy "listings delete own" on public.listings
  for delete using (auth.uid() = owner_id);

-- ============================================================================
-- listing_images
-- ============================================================================
create table if not exists public.listing_images (
  id bigserial primary key,
  listing_id uuid not null references public.listings(id) on delete cascade,
  url text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

create index if not exists listing_images_listing_idx on public.listing_images(listing_id);

alter table public.listing_images enable row level security;

drop policy if exists "listing_images public read" on public.listing_images;
create policy "listing_images public read" on public.listing_images
  for select using (true);

drop policy if exists "listing_images owner write" on public.listing_images;
create policy "listing_images owner write" on public.listing_images
  for all using (
    exists (select 1 from public.listings l where l.id = listing_id and l.owner_id = auth.uid())
  ) with check (
    exists (select 1 from public.listings l where l.id = listing_id and l.owner_id = auth.uid())
  );

-- ============================================================================
-- listing_amenities (join table)
-- ============================================================================
create table if not exists public.listing_amenities (
  listing_id uuid not null references public.listings(id) on delete cascade,
  amenity_id bigint not null references public.amenities(id) on delete cascade,
  primary key (listing_id, amenity_id)
);

alter table public.listing_amenities enable row level security;

drop policy if exists "listing_amenities public read" on public.listing_amenities;
create policy "listing_amenities public read" on public.listing_amenities
  for select using (true);

drop policy if exists "listing_amenities owner write" on public.listing_amenities;
create policy "listing_amenities owner write" on public.listing_amenities
  for all using (
    exists (select 1 from public.listings l where l.id = listing_id and l.owner_id = auth.uid())
  ) with check (
    exists (select 1 from public.listings l where l.id = listing_id and l.owner_id = auth.uid())
  );

-- ============================================================================
-- bookings
-- ============================================================================
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  start_date date,
  end_date date,
  guests int default 1,
  total numeric(10, 2),
  status booking_status default 'pending',
  notes text,
  contact_name text,
  contact_email text,
  contact_phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists bookings_user_idx on public.bookings(user_id);
create index if not exists bookings_listing_idx on public.bookings(listing_id);

alter table public.bookings enable row level security;

drop policy if exists "bookings read own or listing owner" on public.bookings;
create policy "bookings read own or listing owner" on public.bookings
  for select using (
    auth.uid() = user_id or
    exists (select 1 from public.listings l where l.id = listing_id and l.owner_id = auth.uid())
  );

drop policy if exists "bookings insert own" on public.bookings;
create policy "bookings insert own" on public.bookings
  for insert with check (auth.uid() = user_id);

drop policy if exists "bookings update own or listing owner" on public.bookings;
create policy "bookings update own or listing owner" on public.bookings
  for update using (
    auth.uid() = user_id or
    exists (select 1 from public.listings l where l.id = listing_id and l.owner_id = auth.uid())
  );

-- ============================================================================
-- bookmarks
-- ============================================================================
create table if not exists public.bookmarks (
  user_id uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, listing_id)
);

alter table public.bookmarks enable row level security;

drop policy if exists "bookmarks read own" on public.bookmarks;
create policy "bookmarks read own" on public.bookmarks
  for select using (auth.uid() = user_id);

drop policy if exists "bookmarks write own" on public.bookmarks;
create policy "bookmarks write own" on public.bookmarks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================================
-- reviews
-- ============================================================================
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  body text,
  created_at timestamptz default now(),
  unique (listing_id, user_id)
);

create index if not exists reviews_listing_idx on public.reviews(listing_id);

alter table public.reviews enable row level security;

drop policy if exists "reviews public read" on public.reviews;
create policy "reviews public read" on public.reviews
  for select using (true);

drop policy if exists "reviews insert own" on public.reviews;
create policy "reviews insert own" on public.reviews
  for insert with check (auth.uid() = user_id);

drop policy if exists "reviews update own" on public.reviews;
create policy "reviews update own" on public.reviews
  for update using (auth.uid() = user_id);

drop policy if exists "reviews delete own" on public.reviews;
create policy "reviews delete own" on public.reviews
  for delete using (auth.uid() = user_id);

-- ============================================================================
-- messages (schema only; UI hidden in MVP)
-- ============================================================================
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  from_user uuid not null references public.profiles(id) on delete cascade,
  to_user uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid references public.listings(id) on delete set null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists messages_participants_idx on public.messages(from_user, to_user);

alter table public.messages enable row level security;

drop policy if exists "messages read participants" on public.messages;
create policy "messages read participants" on public.messages
  for select using (auth.uid() = from_user or auth.uid() = to_user);

drop policy if exists "messages insert as sender" on public.messages;
create policy "messages insert as sender" on public.messages
  for insert with check (auth.uid() = from_user);

-- ============================================================================
-- updated_at triggers
-- ============================================================================
create or replace function public.tg_touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function public.tg_touch_updated_at();

drop trigger if exists trg_listings_updated on public.listings;
create trigger trg_listings_updated before update on public.listings
  for each row execute function public.tg_touch_updated_at();

drop trigger if exists trg_bookings_updated on public.bookings;
create trigger trg_bookings_updated before update on public.bookings
  for each row execute function public.tg_touch_updated_at();
