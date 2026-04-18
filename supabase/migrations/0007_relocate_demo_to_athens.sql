-- Relocate all 10 demo listings to Athens, Greece.
-- Addresses, neighbourhoods, and phone numbers swapped for local ones;
-- coordinates use real Athens neighbourhood centres.
-- Idempotent: re-run is a no-op because it just re-writes the same values.

update public.listings set
  address = 'Leof. Vasilissis Sofias 41', city = 'Athens', country = 'Greece',
  phone = '+30 210 555 0131',
  lat = 37.9790::numeric, lng = 23.7424::numeric,
  description = 'Strength-first training club in Kolonaki. Olympic platforms, 24/7 member access, and small-group coaching seven days a week.'
where slug = 'iron-peak-fitness';

update public.listings set
  address = 'Leof. Poseidonos 58', city = 'Athens', country = 'Greece',
  phone = '+30 210 555 0144',
  lat = 37.8660::numeric, lng = 23.7549::numeric,
  description = 'Seafront club in Glyfada with rooftop pool, yoga studios, and recovery lounge. Day passes available, members get priority booking on classes.'
where slug = 'skyline-wellness-club';

update public.listings set
  address = 'Adrianou 85', city = 'Athens', country = 'Greece',
  phone = '+30 210 555 0199',
  lat = 37.9715::numeric, lng = 23.7257::numeric,
  description = 'Seasonal Aegean plates with a 200-label natural wine list in Plaka. Private dining room seats up to 14.'
where slug = 'lumen-bistro-and-wine';

update public.listings set
  address = 'Themistokleous 62', city = 'Athens', country = 'Greece',
  phone = '+30 210 555 0172',
  lat = 37.9860::numeric, lng = 23.7331::numeric,
  description = 'Handmade noodles and tonkotsu simmered for 18 hours in the heart of Exarcheia. Counter seating; no reservations but the line moves fast.'
where slug = 'sakura-ramen-house';

update public.listings set
  address = 'Akti Miaouli 42', city = 'Athens', country = 'Greece',
  phone = '+30 210 555 0108',
  lat = 37.9478::numeric, lng = 23.6425::numeric,
  description = 'Boutique collection of waterfront loft apartments in Piraeus. Tours by appointment, short- and long-term leases.'
where slug = 'harborview-lofts';

update public.listings set
  address = 'Eth. Antistaseos 12', city = 'Athens', country = 'Greece',
  phone = '+30 210 555 0117',
  lat = 38.0731::numeric, lng = 23.8155::numeric,
  description = 'Restored mountain estate in Kifisia with lush gardens. Full-service planning, in-house catering, and on-site suites for the wedding party.'
where slug = 'evergreen-wedding-barn';

update public.listings set
  address = 'Ymittou 118', city = 'Athens', country = 'Greece',
  phone = '+30 210 555 0163',
  lat = 37.9667::numeric, lng = 23.7458::numeric,
  description = 'Independent import specialist in Pangrati — BMW, Audi, VW, and Volvo. Certified technicians, loaner cars, 2-year warranty on all repairs.'
where slug = 'quicklane-auto-works';

update public.listings set
  address = 'El. Venizelou 94', city = 'Athens', country = 'Greece',
  phone = '+30 210 555 0141',
  lat = 37.9442::numeric, lng = 23.7131::numeric,
  description = 'Full-service spa in Nea Smyrni. Signature deep-tissue massage, four treatment suites, steam and salt room.'
where slug = 'serenity-day-spa';

update public.listings set
  address = 'Agias Theklas 7', city = 'Athens', country = 'Greece',
  phone = '+30 210 555 0188',
  lat = 37.9798::numeric, lng = 23.7244::numeric,
  description = 'Analog-only listening bar in Psyri. 3,000-record library, craft cocktails, Japanese whisky on rotation. 18+ after 8pm.'
where slug = 'midnight-vinyl-bar';

update public.listings set
  address = 'Filellinon 4', city = 'Athens', country = 'Greece',
  phone = '+30 210 555 0129',
  lat = 37.9754::numeric, lng = 23.7348::numeric,
  description = 'After-school STEM and arts programs near Syntagma for ages 6–14. Small class sizes, certified educators, sliding-scale tuition.'
where slug = 'learning-tree-academy';

-- Verify.
select title, city, country, lat, lng from public.listings
where owner_id = '06cddaf9-7939-459d-8390-d1b1b114f8b8'
order by created_at;
