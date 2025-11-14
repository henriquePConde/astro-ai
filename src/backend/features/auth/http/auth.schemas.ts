import { z } from 'zod';

// Request schemas
export const syncSessionBody = z.object({
  access_token: z.string().min(1),
  refresh_token: z.string().min(1),
});

// Response schemas
export const syncSessionResponseDto = z.object({
  ok: z.boolean(),
});

export const signOutResponseDto = z.object({
  ok: z.boolean(),
});

export type SyncSessionBody = z.infer<typeof syncSessionBody>;
export type SyncSessionResponseDto = z.infer<typeof syncSessionResponseDto>;
export type SignOutResponseDto = z.infer<typeof signOutResponseDto>;
