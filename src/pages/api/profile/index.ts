import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../../lib/supabase/types';

export const prerender = false;

const AVATAR_BUCKET = 'avatars';
const MAX_AVATAR_BYTES = 1024 * 1024;
const ALLOWED_AVATAR_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

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

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail('Invalid form data');
  }

  const patch: Record<string, any> = {
    full_name: String(form.get('full_name') ?? '').trim() || null,
    bio: String(form.get('bio') ?? '').trim() || null,
    phone: String(form.get('phone') ?? '').trim() || null,
    address: String(form.get('address') ?? '').trim() || null,
    city: String(form.get('city') ?? '').trim() || null,
    state: String(form.get('state') ?? '').trim() || null,
    country: String(form.get('country') ?? '').trim() || null,
    zip: String(form.get('zip') ?? '').trim() || null,
    website: String(form.get('website') ?? '').trim() || null,
  };

  const latRaw = String(form.get('lat') ?? '').trim();
  const lngRaw = String(form.get('lng') ?? '').trim();
  patch.lat = latRaw ? Number(latRaw) : null;
  patch.lng = lngRaw ? Number(lngRaw) : null;

  const social: Record<string, string | null> = {
    facebook: String(form.get('facebook') ?? '').trim() || null,
    twitter: String(form.get('twitter') ?? '').trim() || null,
    linkedin: String(form.get('linkedin') ?? '').trim() || null,
    instagram: String(form.get('instagram') ?? '').trim() || null,
    youtube: String(form.get('youtube') ?? '').trim() || null,
    dribbble: String(form.get('dribbble') ?? '').trim() || null,
  };
  patch.social_links = social;

  // Optional avatar upload — uses service-role client so storage RLS isn't
  // blocked by any edge-case auth cookie handling. We still namespace the path
  // by user.id so a misbehaving client can't overwrite someone else's avatar.
  const avatarFile = form.get('avatar');
  if (avatarFile instanceof File && avatarFile.size > 0) {
    if (avatarFile.size > MAX_AVATAR_BYTES) {
      return redirect('/dashboard-my-profile/?error=' + encodeURIComponent('Avatar must be under 1 MB'));
    }
    if (!ALLOWED_AVATAR_TYPES.has(avatarFile.type)) {
      return redirect('/dashboard-my-profile/?error=' + encodeURIComponent('Avatar must be JPG, PNG, WebP, or GIF'));
    }
    const ext = avatarFile.type.split('/')[1];
    const path = `${user.id}/${Date.now()}.${ext}`;
    const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
    const supaUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    if (serviceKey && supaUrl) {
      const admin = createClient<Database>(supaUrl, serviceKey, { auth: { persistSession: false } });
      const { error: upErr } = await admin.storage.from(AVATAR_BUCKET).upload(path, avatarFile, {
        contentType: avatarFile.type,
        upsert: false,
      });
      if (upErr) {
        return redirect('/dashboard-my-profile/?error=' + encodeURIComponent('Upload failed: ' + upErr.message));
      }
      const { data: pub } = admin.storage.from(AVATAR_BUCKET).getPublicUrl(path);
      patch.avatar_url = pub.publicUrl;
    }
  }

  // Keep auth.user_metadata.full_name in sync so the navbar greeting updates
  // without a cold reload.
  if (patch.full_name) {
    await supabase.auth.updateUser({ data: { full_name: patch.full_name } });
  }

  const { error } = await supabase.from('profiles').update(patch).eq('id', user.id);
  if (error) {
    return redirect('/dashboard-my-profile/?error=' + encodeURIComponent(error.message));
  }

  return redirect('/dashboard-my-profile/?notice=' + encodeURIComponent('Profile updated.'));
};
