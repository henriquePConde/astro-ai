import { cookies } from 'next/headers';
import { supabaseServerMutable } from '@/backend/core/db/supabase-server-mutable';
import {
  syncSessionBody,
  syncSessionResponseDto,
  signOutResponseDto,
  type SyncSessionBody,
} from '../http/auth.schemas';

/**
 * Syncs client session to server cookies.
 */
export async function syncSession(input: SyncSessionBody) {
  const { access_token, refresh_token } = syncSessionBody.parse(input);

  const supabase = await supabaseServerMutable();
  const { error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error) {
    throw new Error(error.message);
  }

  return syncSessionResponseDto.parse({ ok: true });
}

/**
 * Signs out the current user and clears all session cookies.
 * Idempotent: returns success even if no session exists.
 */
export async function signOut() {
  const supabase = await supabaseServerMutable();

  // Try to hydrate the session from cookies
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // Revoke session & let Supabase clear its cookies via setAll()
    const { error } = await supabase.auth.signOut();
    if (error) {
      // Even if revoke fails, fall through to hard-clear cookies below
      // but still return 200 to keep signout idempotent for the client UX
    }
  }

  // Hard-clear any lingering sb-* cookies to be safe
  const jar = await cookies();
  jar
    .getAll()
    .filter(({ name }) => name.startsWith('sb-')) // sb-access-token, sb-refresh-token, etc.
    .forEach(({ name }) => {
      // expire now
      jar.set(name, '', { maxAge: 0, path: '/' });
    });

  return signOutResponseDto.parse({ ok: true });
}
