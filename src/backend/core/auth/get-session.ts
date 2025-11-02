import { supabaseServer } from '@/backend/core/db/supabase-server';

export async function getSessionUser() {
  const db = await supabaseServer();
  const { data } = await db.auth.getUser();
  return data.user ?? null;
}
