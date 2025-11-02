// src/features/auth/hooks/use-auth.query.ts
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/auth.service';
import { authKeys } from '../services/auth.keys';

export function useAuth() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: getCurrentUser,
    // We only need quick-ish freshness; onAuthStateChange will also update cache.
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}
