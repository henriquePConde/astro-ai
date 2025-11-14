import { getSessionUser } from './get-session';
import { unauthorized } from '@/backend/core/errors/http-errors';

export async function requireAuth() {
  const user = await getSessionUser();
  if (!user) throw unauthorized();
  return user;
}
