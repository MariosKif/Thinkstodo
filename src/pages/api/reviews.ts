import type { APIRoute } from 'astro';

export const prerender = false;

function fail(message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const supabase = locals.supabase;
  const user = locals.user;
  if (!supabase || !user) return fail('unauthenticated', 401);

  const form = await request.formData();
  const listingId = String(form.get('listing_id') ?? '');
  const ratingRaw = Number(String(form.get('rating') ?? '0'));
  const body = String(form.get('body') ?? '').trim();

  if (!listingId) return fail('missing listing_id');
  const rating = Math.max(1, Math.min(5, Math.round(ratingRaw)));
  if (!rating) return fail('rating is required');
  if (!body || body.length < 10) return fail('review must be at least 10 characters');

  const { data: listing } = await supabase.from('listings').select('slug').eq('id', listingId).maybeSingle();
  if (!listing) return fail('listing not found', 404);

  // Upsert by (listing_id, user_id) so users edit their existing review.
  const { error } = await supabase.from('reviews').upsert(
    { listing_id: listingId, user_id: user.id, rating, body },
    { onConflict: 'listing_id,user_id' }
  );
  if (error) return fail(error.message, 500);

  // Recalculate listing rating.
  const { data: agg } = await supabase
    .from('reviews')
    .select('rating', { count: 'exact' })
    .eq('listing_id', listingId);
  if (agg && agg.length > 0) {
    const avg = agg.reduce((s: number, r: any) => s + r.rating, 0) / agg.length;
    await supabase
      .from('listings')
      .update({ rating: Math.round(avg * 10) / 10, review_count: agg.length })
      .eq('id', listingId);
  }

  return redirect(`/listing/${listing.slug}/#reviews`);
};
