import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ locals, redirect }) => {
  if (locals.supabase) {
    await locals.supabase.auth.signOut();
  }
  return redirect('/');
};

export const GET: APIRoute = async ({ locals, redirect }) => {
  if (locals.supabase) {
    await locals.supabase.auth.signOut();
  }
  return redirect('/');
};
