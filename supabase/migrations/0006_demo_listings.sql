-- 10 demo listings owned by the sole account on record.
-- Idempotent: re-running skips existing slugs.
--
-- 2× Fitness & Gym, 2× Restaurants, 6× spread across the remaining categories.
-- Coordinates are real so they show up on /listings-map.
-- Hero images point to existing files under public/assets/img/list-*.jpg.

with owner as (
  select id from public.profiles where id = '06cddaf9-7939-459d-8390-d1b1b114f8b8'
)
insert into public.listings (
  owner_id, slug, title, description, category_id, phone, address, city, country,
  lat, lng, price_tier, rating, review_count, is_featured, is_verified, status, hero_image
)
select owner.id, v.slug, v.title, v.description, v.category_id, v.phone, v.address, v.city, v.country,
       v.lat, v.lng, v.price_tier, v.rating, v.review_count, v.is_featured, v.is_verified, 'published'::listing_status, v.hero_image
from owner,
(values
  -- 1. Fitness
  ('iron-peak-fitness',
    'Iron Peak Fitness',
    'Strength-first training club in Williamsburg. Olympic platforms, 24/7 member access, and small-group coaching seven days a week.',
    1, '+1 718 555 0131', '414 Grand Street', 'Brooklyn', 'United States',
    40.7127::numeric, -73.9563::numeric, 3::smallint, 4.7::numeric, 128, true, true,
    '/assets/img/list-1.jpg'),
  -- 2. Fitness
  ('skyline-wellness-club',
    'SkyLine Wellness Club',
    'Rooftop pool, yoga studios, and recovery lounge. Day passes available, members get priority booking on classes.',
    1, '+1 512 555 0144', '200 Congress Ave', 'Austin', 'United States',
    30.2649::numeric, -97.7426::numeric, 4::smallint, 4.5::numeric, 87, false, true,
    '/assets/img/list-7.jpg'),
  -- 3. Restaurant
  ('lumen-bistro-and-wine',
    'Lumen Bistro & Wine',
    'Seasonal Pacific-Northwest plates with a 200-label natural wine list. Private dining room seats up to 14.',
    4, '+1 503 555 0199', '913 SW 9th Ave', 'Portland', 'United States',
    45.5155::numeric, -122.6812::numeric, 3::smallint, 4.6::numeric, 214, true, true,
    '/assets/img/list-2.jpg'),
  -- 4. Restaurant
  ('sakura-ramen-house',
    'Sakura Ramen House',
    'Handmade noodles and tonkotsu simmered for 18 hours. Counter seating; no reservations but the line moves fast.',
    4, '+1 415 555 0172', '1578 Polk Street', 'San Francisco', 'United States',
    37.7893::numeric, -122.4194::numeric, 2::smallint, 4.8::numeric, 412, true, true,
    '/assets/img/list-8.jpg'),
  -- 5. Real estate
  ('harborview-lofts',
    'Harborview Lofts',
    'Boutique collection of waterfront loft apartments in Belltown. Tours by appointment, short- and long-term leases.',
    2, '+1 206 555 0108', '2200 Alaskan Way', 'Seattle', 'United States',
    47.6129::numeric, -122.3498::numeric, 4::smallint, 4.3::numeric, 46, false, false,
    '/assets/img/list-3.jpg'),
  -- 6. Wedding
  ('evergreen-wedding-barn',
    'Evergreen Wedding Barn',
    'Restored 1920s mountain barn on 22 acres. Full-service planning, in-house catering, and on-site cabins for the wedding party.',
    3, '+1 828 555 0117', '81 Ridge Orchard Lane', 'Asheville', 'United States',
    35.5951::numeric, -82.5515::numeric, 4::smallint, 4.9::numeric, 73, true, true,
    '/assets/img/list-4.jpg'),
  -- 7. Automotive
  ('quicklane-auto-works',
    'QuickLane Auto Works',
    'Independent import specialist — BMW, Audi, VW, and Volvo. ASE-certified techs, loaner cars, 2-year warranty on all repairs.',
    6, '+1 303 555 0163', '1190 S Broadway', 'Denver', 'United States',
    39.7053::numeric, -104.9876::numeric, 2::smallint, 4.4::numeric, 98, false, true,
    '/assets/img/list-5.jpg'),
  -- 8. Spa
  ('serenity-day-spa',
    'Serenity Day Spa',
    'Full-service spa in South Beach. Signature deep-tissue massage, four treatment suites, steam and salt room.',
    8, '+1 305 555 0141', '1234 Ocean Drive', 'Miami', 'United States',
    25.7803::numeric, -80.1310::numeric, 3::smallint, 4.6::numeric, 156, false, true,
    '/assets/img/list-6.jpg'),
  -- 9. Entertainment
  ('midnight-vinyl-bar',
    'Midnight Vinyl Bar',
    'Analog-only listening bar. 3,000-record library, craft cocktails, Japanese whisky on rotation. 21+ after 8pm.',
    7, '+1 615 555 0188', '615 5th Ave N', 'Nashville', 'United States',
    36.1720::numeric, -86.7858::numeric, 3::smallint, 4.7::numeric, 189, true, false,
    '/assets/img/list-9.jpg'),
  -- 10. Education
  ('learning-tree-academy',
    'The Learning Tree Academy',
    'After-school STEM and arts programs for ages 6–14. Small class sizes, certified educators, sliding-scale tuition.',
    5, '+1 312 555 0129', '2310 N Lincoln Ave', 'Chicago', 'United States',
    41.9213::numeric, -87.6466::numeric, 2::smallint, 4.5::numeric, 61, false, true,
    '/assets/img/list-10.jpg')
) as v(slug, title, description, category_id, phone, address, city, country, lat, lng, price_tier, rating, review_count, is_featured, is_verified, hero_image)
on conflict (slug) do nothing;

-- Verify.
select count(*) as total, sum(case when lat is not null then 1 else 0 end) as mappable
from public.listings
where owner_id = '06cddaf9-7939-459d-8390-d1b1b114f8b8';
