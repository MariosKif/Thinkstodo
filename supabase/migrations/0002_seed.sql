-- Seed categories and amenities.
-- Listings are NOT seeded via SQL — they require an owner_id that references an auth.users row.
-- Instead, Phase 3 imports the context.ts `listings` array at runtime via a server-side script
-- once the first admin user has signed up.

insert into public.categories (slug, name, icon, sort_order) values
  ('fitness', 'Fitness & Gym', 'fa-dumbbell', 10),
  ('real-estate', 'Real Estate', 'fa-house', 20),
  ('wedding', 'Weddings & Events', 'fa-ring', 30),
  ('restaurant', 'Restaurants', 'fa-utensils', 40),
  ('education', 'Education & Study', 'fa-graduation-cap', 50),
  ('automotive', 'Automotive', 'fa-car', 60),
  ('entertainment', 'Entertainment', 'fa-music', 70),
  ('spa', 'Spa & Wellness', 'fa-spa', 80),
  ('shopping', 'Shopping', 'fa-bag-shopping', 90),
  ('travel', 'Travel & Hotels', 'fa-plane', 100)
on conflict (slug) do nothing;

insert into public.amenities (key, name, icon) values
  ('wifi', 'Free Wi-Fi', 'fa-wifi'),
  ('parking', 'Parking Available', 'fa-square-parking'),
  ('ac', 'Air Conditioning', 'fa-snowflake'),
  ('pet-friendly', 'Pet Friendly', 'fa-dog'),
  ('wheelchair', 'Wheelchair Accessible', 'fa-wheelchair'),
  ('kids', 'Kid Friendly', 'fa-child'),
  ('outdoor', 'Outdoor Seating', 'fa-tree'),
  ('delivery', 'Delivery', 'fa-truck'),
  ('reservation', 'Reservations', 'fa-calendar-check'),
  ('credit-card', 'Accepts Credit Card', 'fa-credit-card')
on conflict (key) do nothing;
