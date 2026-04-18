-- Storage bucket for listing images.
-- Public read, authenticated write, owner-only delete.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listing-images',
  'listing-images',
  true,
  5242880, -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Policies on storage.objects for this bucket.
-- Convention: object path starts with "<listing_id>/..." so we can scope ownership by listing_id.

drop policy if exists "listing-images public read" on storage.objects;
create policy "listing-images public read" on storage.objects
  for select using (bucket_id = 'listing-images');

drop policy if exists "listing-images owner insert" on storage.objects;
create policy "listing-images owner insert" on storage.objects
  for insert with check (
    bucket_id = 'listing-images'
    and auth.uid() is not null
    and exists (
      select 1 from public.listings l
      where l.id::text = split_part(name, '/', 1)
        and l.owner_id = auth.uid()
    )
  );

drop policy if exists "listing-images owner update" on storage.objects;
create policy "listing-images owner update" on storage.objects
  for update using (
    bucket_id = 'listing-images'
    and exists (
      select 1 from public.listings l
      where l.id::text = split_part(name, '/', 1)
        and l.owner_id = auth.uid()
    )
  );

drop policy if exists "listing-images owner delete" on storage.objects;
create policy "listing-images owner delete" on storage.objects
  for delete using (
    bucket_id = 'listing-images'
    and exists (
      select 1 from public.listings l
      where l.id::text = split_part(name, '/', 1)
        and l.owner_id = auth.uid()
    )
  );
