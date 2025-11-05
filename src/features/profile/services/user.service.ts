import { client } from '@/shared/services/http/client';
import { z } from 'zod';

export const UserDto = z.object({
  id: z.string(),
  email: z.string().email().optional(),
  name: z.string().optional(),
});

export type User = z.infer<typeof UserDto>;

export async function getMe() {
  const res = await client.get('/api/user/me');
  return UserDto.parse(res.data);
}


