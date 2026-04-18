import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { AstroCookies } from 'astro';
import type { Database } from './types';

/**
 * Supabase client for use in .astro frontmatter and API endpoints.
 * Reads cookies from Astro so the user session survives page navigations.
 * Returns null if env vars are missing — caller MUST handle null until Plan 1 seeds credentials.
 */
export function getSupabaseServer(cookies: AstroCookies) {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;

  return createServerClient<Database>(url, anon, {
    cookies: {
      get(name: string) {
        return cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookies.set(name, value, options);
      },
      remove(name: string, options: CookieOptions) {
        cookies.delete(name, options);
      },
    },
  });
}
