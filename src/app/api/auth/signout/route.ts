// src/app/api/auth/signout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseServerMutable } from '@/backend/core/db/supabase-server-mutable';

/**
 * Idempotent sign-out:
 * - If a session exists: revoke via Supabase and clear cookies.
 * - If no session: still clear any sb-* cookies and return 200.
 */
export async function POST() {
  const sb = await supabaseServerMutable();

  // Try to hydrate the session from cookies
  const {
    data: { session },
  } = await sb.auth.getSession();

  if (session) {
    // Revoke session & let Supabase clear its cookies via setAll()
    const { error } = await sb.auth.signOut(); // consider { scope: 'global' } if you want everywhere
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

  return NextResponse.json({ ok: true });
}
