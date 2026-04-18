import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect, url }) => {
  const supabase = locals.supabase;
  if (!supabase) {
    return redirect('/forgot-password/?error=' + encodeURIComponent('Server misconfigured'));
  }

  const form = await request.formData();
  const email = String(form.get('email') ?? '').trim();
  if (!email) {
    return redirect('/forgot-password/?error=' + encodeURIComponent('Email is required'));
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${url.origin}/api/auth/callback?type=recovery`,
  });
  if (error) {
    return redirect('/forgot-password/?error=' + encodeURIComponent(error.message));
  }

  return redirect('/login/?notice=' + encodeURIComponent('Password reset email sent. Check your inbox.'));
};
