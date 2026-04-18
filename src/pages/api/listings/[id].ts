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
  const id = params.id;
  if (!id) return fail('missing id');

  const form = await request.formData();
  const action = String(form.get('_action') ?? '');

  if (action === 'delete') {
    const { error } = await supabase.from('listings').delete().eq('id', id).eq('owner_id', user.id);
    if (error) return redirect('/dashboard-my-listings/?error=' + encodeURIComponent(error.message));
    return redirect('/dashboard-my-listings/?notice=' + encodeURIComponent('Listing deleted.'));
  }

  if (action === 'publish' || action === 'unpublish') {
    const status = action === 'publish' ? 'published' : 'draft';
    const { error } = await supabase
      .from('listings')
      .update({ status })
      .eq('id', id)
      .eq('owner_id', user.id);
    if (error) return redirect('/dashboard-my-listings/?error=' + encodeURIComponent(error.message));
    return redirect('/dashboard-my-listings/?notice=' + encodeURIComponent(
      status === 'published' ? 'Listing published.' : 'Listing moved to draft.'
    ));
  }

  return redirect('/dashboard-my-listings/?error=' + encodeURIComponent('Unknown action'));
};
