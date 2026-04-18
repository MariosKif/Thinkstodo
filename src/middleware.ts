import { defineMiddleware } from 'astro:middleware';
import { getSupabaseServer } from './lib/supabase/server';

const AUTH_REDIRECT_PREFIXES = ['/dashboard-'];
const PUBLIC_API_PREFIXES = ['/api/auth/'];

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.user = null;
  context.locals.session = null;
  context.locals.supabase = null;

  // Skip Supabase session hydration during static prerender — there's no real
  // request so cookies are empty and @supabase/ssr warns about header access.
  if (context.isPrerendered) {
    return next();
  }

  const supabase = getSupabaseServer(context.cookies);
  context.locals.supabase = supabase;

  if (supabase) {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      context.locals.user = data.user;
      const { data: sessionData } = await supabase.auth.getSession();
      context.locals.session = sessionData.session;
    }
  }

  const path = context.url.pathname;
  const needsAuth =
    AUTH_REDIRECT_PREFIXES.some((p) => path.startsWith(p)) ||
    (path.startsWith('/api/') && !PUBLIC_API_PREFIXES.some((p) => path.startsWith(p)));

  if (needsAuth && !context.locals.user) {
    if (path.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'unauthenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return context.redirect(`/login/?next=${encodeURIComponent(path)}`);
  }

  return next();
});
