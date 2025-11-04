// src/backend/features/users/http/users.schemas.ts
import { z } from 'zod';

export const userDto = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().nullable().optional(),
  createdAt: z.date(), // Prisma returns Date
});

export type UserDto = z.infer<typeof userDto>;
