import { makeUsersRepo } from '../infra/users.repo';
import { userDto } from '../http/users.schemas';
import { supabaseServer } from '@/backend/core/db/supabase-server';

export async function getOrCreateCurrentUser() {
  const db = await supabaseServer();
  const { data: auth } = await db.auth.getUser();
  const email = auth.user?.email;
  const name = (auth.user?.user_metadata as any)?.name ?? auth.user?.email ?? null;
  if (!email) throw new Error('Unauthorized');
  const repo = await makeUsersRepo();
  const row = await repo.ensureCurrent({ email, name });
  return userDto.parse(row);
}
