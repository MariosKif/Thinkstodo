import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

type DB = SupabaseClient<Database>;

export async function getMyProfile(supabase: DB | null, userId: string): Promise<ProfileRow | null> {
  if (!supabase) return null;
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
  return data ?? null;
}

export async function updateMyProfile(
  supabase: DB | null,
  userId: string,
  patch: ProfileUpdate
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!supabase) return { ok: false, error: 'Supabase unavailable' };
  const { error } = await supabase.from('profiles').update(patch).eq('id', userId);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function getUnreadMessageCount(supabase: DB | null, userId: string): Promise<number> {
  if (!supabase) return 0;
  const { count } = await supabase
    .from('messages')
    .select('id', { count: 'exact', head: true })
    .eq('to_user', userId)
    .is('read_at', null);
  return count ?? 0;
}
