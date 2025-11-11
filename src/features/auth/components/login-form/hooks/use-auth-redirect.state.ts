import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';

/**
 * Handles redirect logic for authenticated users.
 * Pure navigation hook - follows the *.state.ts pattern.
 * Co-located in login-form since it's the primary form; other forms import from here.
 */
export function useAuthRedirect(isAuthenticated: boolean) {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(AUTH_ROUTES.HOME);
    }
  }, [isAuthenticated, router]);
}
