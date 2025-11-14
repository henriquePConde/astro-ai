import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from './auth.service';
import { authKeys } from './auth.keys';

/**
 * Query hook for fetching the current authenticated user.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useAuthQuery() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: getCurrentUser,
    // We only need quick-ish freshness; onAuthStateChange will also update cache.
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}
