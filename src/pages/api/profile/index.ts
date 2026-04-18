import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../../lib/supabase/types';

export const prerender = false;

const AVATAR_BUCKET = 'avatars';
const MAX_AVATAR_BYTES = 1024 * 1024;
const ALLOWED_AVATAR_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

// Mirrors the `maxlength` attributes on dashboard-my-profile.astro — server-side
// caps so a crafted request can't bypass the HTML limits and stuff the DB.
const LIMITS = {
  full_name: 120,
  phone: 40,
  bio: 2000,
  address: 200,
  city: 100,
  state: 100,
  country: 100,
  zip: 20,
  website: 400,
  social: 400,
} as const;

function fail(message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Trim, cap length, return `null` when empty. */
function clean(form: FormData, field: string, max: number): string | null {
  const raw = String(form.get(field) ?? '').trim();
  if (!raw) return null;
  return raw.slice(0, max);
}

/** Accept only URLs the WHATWG `URL` parser can round-trip (http/https). */
function cleanUrl(form: FormData, field: string, max: number): string | null | 'invalid' {
  const raw = clean(form, field, max);
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return 'invalid';
    return raw;
  } catch {
    return 'invalid';
  }
}

function redirectErr(redirect: (to: string) => Response, msg: string) {
  return redirect('/dashboard-my-profile/?error=' + encodeURIComponent(msg));
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

  // --- URL validation ----------------------------------------------------
  const website = cleanUrl(form, 'website', LIMITS.website);
  if (website === 'invalid') return redirectErr(redirect, 'Website must be a valid http(s) URL');

  const socialKeys = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'dribbble'] as const;
  const social: Record<string, string | null> = {};
  for (const k of socialKeys) {
    const v = cleanUrl(form, k, LIMITS.social);
    if (v === 'invalid') {
      return redirectErr(redirect, `${k[0].toUpperCase() + k.slice(1)} URL is not a valid http(s) URL`);
    }
    if (v) social[k] = v;
  }

  // --- Main patch --------------------------------------------------------
  const patch: Record<string, any> = {
    full_name: clean(form, 'full_name', LIMITS.full_name),
    bio: clean(form, 'bio', LIMITS.bio),
    phone: clean(form, 'phone', LIMITS.phone),
    address: clean(form, 'address', LIMITS.address),
    city: clean(form, 'city', LIMITS.city),
    state: clean(form, 'state', LIMITS.state),
    country: clean(form, 'country', LIMITS.country),
    zip: clean(form, 'zip', LIMITS.zip),
    website,
    social_links: social,
  };

  const latRaw = String(form.get('lat') ?? '').trim();
  const lngRaw = String(form.get('lng') ?? '').trim();
  const lat = latRaw ? Number(latRaw) : null;
  const lng = lngRaw ? Number(lngRaw) : null;
  if (lat !== null && (!Number.isFinite(lat) || lat < -90 || lat > 90)) {
    return redirectErr(redirect, 'Latitude must be between -90 and 90');
  }
  if (lng !== null && (!Number.isFinite(lng) || lng < -180 || lng > 180)) {
    return redirectErr(redirect, 'Longitude must be between -180 and 180');
  }
  patch.lat = lat;
  patch.lng = lng;

  // --- Avatar upload -----------------------------------------------------
  const avatarFile = form.get('avatar');
  if (avatarFile instanceof File && avatarFile.size > 0) {
    if (avatarFile.size > MAX_AVATAR_BYTES) {
      return redirectErr(redirect, 'Avatar must be under 1 MB');
    }
    if (!ALLOWED_AVATAR_TYPES.has(avatarFile.type)) {
      return redirectErr(redirect, 'Avatar must be JPG, PNG, WebP, or GIF');
    }
    const ext = avatarFile.type.split('/')[1];
    const newName = `${Date.now()}.${ext}`;
    const path = `${user.id}/${newName}`;
    const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
    const supaUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    if (serviceKey && supaUrl) {
      const admin = createClient<Database>(supaUrl, serviceKey, { auth: { persistSession: false } });
      const { error: upErr } = await admin.storage.from(AVATAR_BUCKET).upload(path, avatarFile, {
        contentType: avatarFile.type,
        upsert: false,
      });
      if (upErr) {
        return redirectErr(redirect, 'Upload failed: ' + upErr.message);
      }
      const { data: pub } = admin.storage.from(AVATAR_BUCKET).getPublicUrl(path);
      patch.avatar_url = pub.publicUrl;

      // Purge any previous avatars from this user's folder so we don't
      // accumulate orphan files every time they re-upload.
      const { data: existing } = await admin.storage.from(AVATAR_BUCKET).list(user.id);
      if (existing && existing.length > 0) {
        const stale = existing
          .map((f) => `${user.id}/${f.name}`)
          .filter((p) => p !== path);
        if (stale.length > 0) {
          await admin.storage.from(AVATAR_BUCKET).remove(stale);
        }
      }
    }
  }

  // Keep auth.user_metadata.full_name in sync so the navbar greeting updates
  // without a cold reload.
  if (patch.full_name) {
    await supabase.auth.updateUser({ data: { full_name: patch.full_name } });
  }

  const { error } = await supabase.from('profiles').update(patch).eq('id', user.id);
  if (error) {
    return redirectErr(redirect, error.message);
  }

  return redirect('/dashboard-my-profile/?notice=' + encodeURIComponent('Profile updated.'));
};
