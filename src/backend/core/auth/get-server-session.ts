// src/backend/core/auth/get-server-session.ts
import { supabaseServer } from '@/backend/core/db/supabase-server';

export async function getServerSession() {
  const db = await supabaseServer();
  const { data, error } = await db.auth.getSession();
  if (error) console.warn('[getServerSession] error:', error);
  return data.session ?? null;
}
