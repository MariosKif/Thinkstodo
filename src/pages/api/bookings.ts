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
  if (!listingId) return fail('missing listing_id');

  const firstName = String(form.get('first_name') ?? '').trim();
  const lastName = String(form.get('last_name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const phone = String(form.get('phone') ?? '').trim() || null;
  const startDate = String(form.get('start_date') ?? '').trim() || null;
  const endDate = String(form.get('end_date') ?? '').trim() || null;
  const guestsRaw = String(form.get('guests') ?? '1');
  const guests = Math.max(1, Number(guestsRaw) || 1);
  const notes = String(form.get('notes') ?? '').trim() || null;

  const { data: listing } = await supabase.from('listings').select('slug').eq('id', listingId).maybeSingle();
  if (!listing) {
    return redirect(`/booking-page/?error=${encodeURIComponent('Listing not found')}`);
  }

  const fullName = [firstName, lastName].filter(Boolean).join(' ');
  const { data: inserted, error } = await supabase
    .from('bookings')
    .insert({
      listing_id: listingId,
      user_id: user.id,
      start_date: startDate,
      end_date: endDate,
      guests,
      notes,
      contact_name: fullName || null,
      contact_email: email || null,
      contact_phone: phone,
    })
    .select('id')
    .single();

  if (error || !inserted) {
    return redirect(`/booking-page/?slug=${listing.slug}&error=${encodeURIComponent(error?.message ?? 'Could not save booking')}`);
  }

  return redirect(`/success-payment/?booking=${inserted.id}`);
};
