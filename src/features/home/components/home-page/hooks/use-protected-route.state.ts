import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from '@/features/auth/context/AuthContext';
import { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';

/**
 * Hook that protects a route by redirecting unauthenticated users to login.
 * UI state hook - follows the *.state.ts pattern.
 */
export function useProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const loginPath = `${AUTH_ROUTES.LOGIN}?next=${encodeURIComponent(pathname)}`;
      router.replace(loginPath);
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  return {
    isAuthenticated,
    isLoading,
    shouldRender: !isLoading && isAuthenticated,
  };
}
