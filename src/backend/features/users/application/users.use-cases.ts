import { makeUsersRepo } from '../infra/users.repo';
import { userDto } from '../http/users.schemas';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { unauthorized } from '@/backend/core/errors/http-errors';

export async function getOrCreateCurrentUser() {
  const authUser = await getSessionUser();

  if (!authUser) {
    throw unauthorized();
  }

  if (!authUser.email) {
    throw unauthorized('User email is required');
  }

  const email = authUser.email;
  const name = (authUser.user_metadata as any)?.name ?? authUser.email ?? null;

  const repo = await makeUsersRepo();
  const row = await repo.ensureUser({
    userId: authUser.id,
    email,
    name,
  });

  return userDto.parse(row);
}
