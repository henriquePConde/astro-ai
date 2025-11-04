import { supabaseServer } from '@/backend/core/db/supabase-server';
import { headers } from 'next/headers';

/**
 * Returns the Supabase user from either:
 * 1) Authorization: Bearer <access_token> header (preferred for APIs)
 * 2) Supabase auth cookies
 *
 * NOTE: If you send the ANON KEY in the Authorization header,
 * Supabase will NOT return a user and this will be null.
 */
export async function getSessionUser() {
  const headersList = await headers();
  const authHeader = headersList.get('authorization');

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const supabase = await supabaseServer();
    const { data } = await supabase.auth.getUser(token);
    return data.user ?? null;
  }

  // Fall back to cookie-based session
  const db = await supabaseServer();
  const { data } = await db.auth.getUser();
  return data.user ?? null;
}
