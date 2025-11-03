import { supabaseServer } from '@/backend/core/db/supabase-server';
import { headers } from 'next/headers';

export async function getSessionUser() {
  // Check for Bearer token in Authorization header (for API testing with Postman)
  const headersList = await headers();
  const authHeader = headersList.get('authorization');

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    // Use Supabase's getUser with the token
    const supabase = await supabaseServer();
    const { data } = await supabase.auth.getUser(token);
    return data.user ?? null;
  }

  // Fall back to cookie-based session
  const db = await supabaseServer();
  const { data } = await db.auth.getUser();
  return data.user ?? null;
}
