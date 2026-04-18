import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../../lib/supabase/types';

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
  const confirm = String(form.get('confirm') ?? '');
  if (confirm !== 'DELETE') {
    return redirect('/dashboard-my-profile/?delerror=' + encodeURIComponent('Type DELETE to confirm'));
  }

  const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  const supaUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  if (!serviceKey || !supaUrl) {
    return redirect('/dashboard-my-profile/?delerror=' + encodeURIComponent('Server misconfigured'));
  }

  const admin = createClient<Database>(supaUrl, serviceKey, { auth: { persistSession: false } });
  const { error } = await admin.auth.admin.deleteUser(user.id);
  if (error) {
    return redirect('/dashboard-my-profile/?delerror=' + encodeURIComponent(error.message));
  }

  // Best-effort sign-out. The session may already be invalid now that the
  // underlying auth.users row is gone — swallow any error so we always
  // reach the final redirect.
  try {
    await supabase.auth.signOut();
  } catch {
    // intentionally ignored
  }
  return redirect('/?notice=' + encodeURIComponent('Your account has been deleted.'));
};
