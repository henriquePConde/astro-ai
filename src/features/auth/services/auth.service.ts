// src/features/auth/services/auth.service.ts
import { z } from 'zod';
import { supabaseBrowser } from '@/shared/services/supabase-browser';

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email().optional(),
});

export type User = z.infer<typeof UserSchema>;

/**
 * Client-side: read session from the Supabase browser client.
 * This is the source of truth for the header/UI.
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = supabaseBrowser();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session?.user) return null;

    try {
      return UserSchema.parse({
        id: session.user.id,
        email: session.user.email ?? undefined,
      });
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}

export async function signInWithOtp(email: string, options?: { redirectTo?: string }) {
  const supabase = supabaseBrowser();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: options?.redirectTo || window.location.origin },
  });
  if (error) throw error;
}

export async function signInWithPassword(email: string, password: string) {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data; // { user, session }
}

/**
 * Server session synchronization: syncs client session to server cookies.
 * Non-fatal: failures are silently handled.
 */
export async function syncServerSession(
  access_token?: string,
  refresh_token?: string,
): Promise<void> {
  if (!access_token || !refresh_token) return;

  try {
    await fetch('/api/auth/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ access_token, refresh_token }),
    });
  } catch {
    // non-fatal - session sync failure shouldn't break the app
  }
}

export async function signUp(email: string, password: string) {
  const supabase = supabaseBrowser();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
}

/**
 * Client-side sign-out: clears local storage session.
 */
export async function signOut() {
  const supabase = supabaseBrowser();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Server-side sign-out: clears cookies & revokes session on server.
 * Idempotent: returns success even if no session exists.
 */
export async function signOutServer(): Promise<{ ok: boolean }> {
  const response = await fetch('/api/auth/signout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Server sign-out failed: ${response.statusText}`);
  }

  return response.json();
}
