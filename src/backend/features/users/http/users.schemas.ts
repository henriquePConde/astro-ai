import { z } from 'zod';

export const userDto = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().nullable().optional(),
  created_at: z.string().datetime(),
});

export type UserDto = z.infer<typeof userDto>;
