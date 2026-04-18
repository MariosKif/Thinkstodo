import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect, url }) => {
  const supabase = locals.supabase;
  if (!supabase) {
    return redirect('/register/?error=' + encodeURIComponent('Server misconfigured: Supabase not initialized'));
  }

  const form = await request.formData();
  const email = String(form.get('email') ?? '').trim();
  const password = String(form.get('password') ?? '');
  const confirmPassword = String(form.get('confirm_password') ?? '');
  const fullName = String(form.get('full_name') ?? '').trim();

  if (!email || !password) {
    return redirect('/register/?error=' + encodeURIComponent('Email and password are required'));
  }
  if (password.length < 8) {
    return redirect('/register/?error=' + encodeURIComponent('Password must be at least 8 characters'));
  }
  if (confirmPassword && password !== confirmPassword) {
    return redirect('/register/?error=' + encodeURIComponent('Passwords do not match'));
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName || email.split('@')[0] },
      emailRedirectTo: `${url.origin}/api/auth/callback`,
    },
  });
  if (error) {
    return redirect('/register/?error=' + encodeURIComponent(error.message));
  }

  return redirect('/login/?notice=' + encodeURIComponent('Check your email to confirm your account, then sign in.'));
};
