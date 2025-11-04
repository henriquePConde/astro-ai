// src/backend/features/users/application/users.use-cases.ts
import { makeUsersRepo } from '../infra/users.repo';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { unauthorized } from '@/backend/core/errors/http-errors';
import { userDto, type UserDto } from '../http/users.schemas';

export async function getOrCreateCurrentUser(): Promise<UserDto> {
  const authUser = await getSessionUser();
  if (!authUser) throw unauthorized();
  if (!authUser.email) throw unauthorized('User email is required');

  const email = authUser.email;
  const name = (authUser.user_metadata as any)?.name ?? authUser.email ?? null;

  const repo = await makeUsersRepo();
  const row = await repo.ensureUser({
    userId: authUser.id,
    email,
    name,
  });

  const dto: UserDto = {
    id: row.id,
    email: row.email,
    name: row.name ?? null,
    createdAt: row.createdAt,
  };

  return userDto.parse(dto);
}
