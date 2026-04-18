import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

/**
 * Supabase client for use inside React islands (client-only code).
 * Reads PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY from Astro's public env.
 * Returns null if env vars are missing so pages can still render before credentials are pasted in.
 */
export function getSupabaseBrowser() {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createBrowserClient<Database>(url, anon);
}
