import { useQuery } from '@tanstack/react-query';
import { client } from '@/shared/services/http/client';
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().nullable().optional(),
  createdAt: z.string().or(z.date()),
});

export type User = z.infer<typeof UserSchema>;

const userKeys = {
  all: ['user'] as const,
  me: () => [...userKeys.all, 'me'] as const,
};

/**
 * Query hook for fetching current user data including name.
 * Defined in services layer for reusability.
 */
export function useUserQuery() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: async () => {
      const res = await client.get('/api/user/me');
      return UserSchema.parse(res.data);
    },
    staleTime: 60_000, // 1 minute
  });
}
