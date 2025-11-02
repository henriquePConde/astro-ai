import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Handles redirect logic for authenticated users.
 * Pure navigation hook - follows the *.state.ts pattern.
 */
export function useAuthRedirect(isAuthenticated: boolean) {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);
}
