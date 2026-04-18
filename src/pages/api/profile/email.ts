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
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  if (!email || !email.includes('@')) {
    return redirect('/dashboard-my-profile/?emailerror=' + encodeURIComponent('Enter a valid email'));
  }

  const { data, error } = await supabase.auth.updateUser({ email });
  if (error) {
    return redirect('/dashboard-my-profile/?emailerror=' + encodeURIComponent(error.message));
  }

  // Supabase returns the current email on `data.user.email`. When secure
  // email change is enabled (default), the address hasn't switched yet — a
  // confirmation link was emailed. Otherwise the new email is already live.
  const applied = data?.user?.email === email;
  const notice = applied
    ? 'Email updated.'
    : 'Confirmation link sent — click it from your new email to finish the change.';
  return redirect('/dashboard-my-profile/?emailnotice=' + encodeURIComponent(notice));
};
