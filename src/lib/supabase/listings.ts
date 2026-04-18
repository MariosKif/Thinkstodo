import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

type DB = SupabaseClient<Database>;

/**
 * View-model shape that the template's card markup expects.
 * We pre-fill cosmetic fields (color/icon/class/etc.) with sensible defaults
 * so the existing JSX doesn't need to change.
 */
export type ListingCard = {
  id: string;
  slug: string;
  title: string;
  desc: string;
  img: string;
  number: string;
  name: string; // category display name
  city: string;
  address: string;
  rating: string;
  reviews: string;
  btn: string; // "Open" / "Closed" / "Verified"
  dollar: string; // "$", "$$", "$$$"
  tag: boolean; // featured
  miles: string;
  color: string;
  icon: string;
  check: string;
  class: string;
  span: string;
  avarage: string;
  plus: string;
  location: string;
  lat: number | null;
  lng: number | null;
};

function row2card(r: any): ListingCard {
  const firstImage = Array.isArray(r.listing_images) && r.listing_images.length > 0
    ? r.listing_images[0].url
    : null;
  const img = r.hero_image || firstImage || '/assets/img/list-1.jpg';
  const categoryName = r.categories?.name || 'Listing';
  const tier = Math.min(Math.max(Number(r.price_tier) || 1, 1), 4);
  const verified = !!r.is_verified;

  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    desc: r.description || '',
    img,
    number: r.phone || '',
    name: categoryName,
    city: r.city || '',
    address: r.address || '',
    rating: r.rating != null ? String(r.rating) : '4.5',
    reviews: `${r.review_count ?? 0} Reviews`,
    btn: verified ? 'Verified' : 'Open',
    dollar: '$'.repeat(tier),
    tag: !!r.is_featured,
    miles: r.city ? `${r.city}` : '',
    color: verified ? 'success' : 'primary',
    icon: 'bi-patch-check-fill',
    check: 'text-success',
    class: 'bg-light-success text-success',
    span: verified ? 'Verified' : 'New',
    avarage: r.rating != null ? String(r.rating) : '4.5',
    plus: '',
    location: [r.city, r.country].filter(Boolean).join(', '),
    lat: r.lat ?? null,
    lng: r.lng ?? null,
  };
}

const SELECT = '*, listing_images(url, sort_order), categories(name, slug)';

export async function getPublishedListings(
  supabase: DB | null,
  opts: { limit?: number; featured?: boolean; categorySlug?: string; city?: string } = {}
): Promise<ListingCard[]> {
  if (!supabase) return [];
  let q = supabase.from('listings').select(SELECT).eq('status', 'published');
  if (opts.featured) q = q.eq('is_featured', true);
  if (opts.city) q = q.ilike('city', `%${opts.city}%`);
  if (opts.categorySlug) {
    const { data: cat } = await supabase.from('categories').select('id').eq('slug', opts.categorySlug).maybeSingle();
    if (cat?.id) q = q.eq('category_id', cat.id);
  }
  q = q.order('is_featured', { ascending: false }).order('created_at', { ascending: false });
  if (opts.limit) q = q.limit(opts.limit);
  const { data, error } = await q;
  if (error || !data) return [];
  return data.map(row2card);
}

export async function getMappableListings(
  supabase: DB | null,
  opts: { limit?: number } = {}
): Promise<ListingCard[]> {
  if (!supabase) return [];
  let q = supabase
    .from('listings')
    .select(SELECT)
    .eq('status', 'published')
    .not('lat', 'is', null)
    .not('lng', 'is', null)
    .order('is_featured', { ascending: false })
    .order('rating', { ascending: false, nullsFirst: false });
  if (opts.limit) q = q.limit(opts.limit);
  const { data, error } = await q;
  if (error || !data) return [];
  return data.map(row2card);
}

export async function getListingBySlug(supabase: DB | null, slug: string) {
  if (!supabase) return null;
  const { data } = await supabase
    .from('listings')
    .select(SELECT + ', profiles:owner_id(id, full_name, avatar_url)')
    .eq('slug', slug)
    .maybeSingle();
  if (!data) return null;
  return { card: row2card(data), raw: data };
}

export async function searchListings(
  supabase: DB | null,
  { q, categorySlug, city, limit = 40 }: { q?: string; categorySlug?: string; city?: string; limit?: number }
): Promise<ListingCard[]> {
  if (!supabase) return [];
  let query = supabase.from('listings').select(SELECT).eq('status', 'published');
  if (q && q.trim()) {
    const needle = `%${q.trim()}%`;
    query = query.or(`title.ilike.${needle},description.ilike.${needle},city.ilike.${needle}`);
  }
  if (city) query = query.ilike('city', `%${city}%`);
  if (categorySlug) {
    const { data: cat } = await supabase.from('categories').select('id').eq('slug', categorySlug).maybeSingle();
    if (cat?.id) query = query.eq('category_id', cat.id);
  }
  query = query.order('is_featured', { ascending: false }).order('rating', { ascending: false, nullsFirst: false }).limit(limit);
  const { data, error } = await query;
  if (error || !data) return [];
  return data.map(row2card);
}

export async function getListingsByOwner(supabase: DB | null, ownerId: string): Promise<ListingCard[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from('listings')
    .select(SELECT)
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false });
  if (!data) return [];
  return data.map(row2card);
}

export async function getBookmarkedListings(supabase: DB | null, userId: string): Promise<ListingCard[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from('bookmarks')
    .select('listings(' + SELECT.substring(2) + ')')
    .eq('user_id', userId);
  if (!data) return [];
  return data
    .map((row: any) => row.listings)
    .filter(Boolean)
    .map(row2card);
}

export function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
