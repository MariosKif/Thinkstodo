-- Extend profiles with contact + bio + social info.
alter table public.profiles
  add column if not exists bio text,
  add column if not exists address text,
  add column if not exists city text,
  add column if not exists state text,
  add column if not exists country text,
  add column if not exists zip text,
  add column if not exists lat numeric(10, 7),
  add column if not exists lng numeric(10, 7),
  add column if not exists website text,
  add column if not exists social_links jsonb default '{}'::jsonb;
