import type { APIRoute } from 'astro';

export const prerender = false;

function fail(message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ params, request, locals, redirect }) => {
  const supabase = locals.supabase;
  const user = locals.user;
  if (!supabase || !user) return fail('unauthenticated', 401);
  const listingId = params.listing_id;
  if (!listingId) return fail('missing listing_id');

  const form = await request.formData();
  const action = String(form.get('_action') ?? 'toggle');
  const returnTo = String(form.get('return_to') ?? '/dashboard-bookmarks/');

  if (action === 'remove') {
    await supabase.from('bookmarks').delete().eq('user_id', user.id).eq('listing_id', listingId);
  } else if (action === 'add') {
    await supabase.from('bookmarks').insert({ user_id: user.id, listing_id: listingId });
  } else {
    // toggle
    const { data } = await supabase
      .from('bookmarks')
      .select('listing_id')
      .eq('user_id', user.id)
      .eq('listing_id', listingId)
      .maybeSingle();
    if (data) {
      await supabase.from('bookmarks').delete().eq('user_id', user.id).eq('listing_id', listingId);
    } else {
      await supabase.from('bookmarks').insert({ user_id: user.id, listing_id: listingId });
    }
  }

  return redirect(returnTo);
};
