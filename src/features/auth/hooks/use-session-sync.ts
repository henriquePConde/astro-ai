import type { Session } from '@supabase/supabase-js';

/**
 * Handles server session synchronization.
 * Pure I/O hook - syncs client session to server cookies.
 */
export async function syncServerSession(session?: Session | null): Promise<void> {
  const access_token = session?.access_token;
  const refresh_token = session?.refresh_token;
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
