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
  const next = String(form.get('new_password') ?? '');
  const confirm = String(form.get('confirm_password') ?? '');

  if (next.length < 8) {
    return redirect('/dashboard-my-profile/?pwerror=' + encodeURIComponent('New password must be at least 8 characters'));
  }
  if (next !== confirm) {
    return redirect('/dashboard-my-profile/?pwerror=' + encodeURIComponent('Passwords do not match'));
  }

  const { error } = await supabase.auth.updateUser({ password: next });
  if (error) {
    return redirect('/dashboard-my-profile/?pwerror=' + encodeURIComponent(error.message));
  }

  return redirect('/dashboard-my-profile/?pwnotice=' + encodeURIComponent('Password updated.'));
};
