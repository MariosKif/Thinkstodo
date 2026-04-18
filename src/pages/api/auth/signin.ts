import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const supabase = locals.supabase;
  if (!supabase) {
    return redirect('/login/?error=' + encodeURIComponent('Server misconfigured: Supabase not initialized'));
  }

  const form = await request.formData();
  const email = String(form.get('email') ?? '').trim();
  const password = String(form.get('password') ?? '');
  const next = String(form.get('next') ?? '/dashboard-user/');

  if (!email || !password) {
    return redirect('/login/?error=' + encodeURIComponent('Email and password are required'));
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return redirect('/login/?error=' + encodeURIComponent(error.message));
  }

  return redirect(next);
};
