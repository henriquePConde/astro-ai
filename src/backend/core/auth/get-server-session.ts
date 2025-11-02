import { supabaseServer } from '@/backend/core/db/supabase-server';

export async function getServerSession() {
  const db = await supabaseServer();
  const { data } = await db.auth.getSession();
  return data.session ?? null;
}
