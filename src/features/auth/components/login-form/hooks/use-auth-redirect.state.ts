import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';

/**
 * Handles redirect logic for authenticated users.
 * Pure navigation hook - follows the *.state.ts pattern.
 * Co-located in login-form since it's the primary form; other forms import from here.
 */
export function useAuthRedirect(isAuthenticated: boolean, nextPath?: string) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) return;

    // Only redirect if we're on login or signup pages
    if (pathname !== '/login' && pathname !== '/signup') return;

    // Prefer the ?next=/... param when present so users return
    // to the page they originally tried to access.
    const target =
      nextPath && nextPath.startsWith('/') && !nextPath.startsWith('//')
        ? nextPath
        : AUTH_ROUTES.HOME;

    router.replace(target);
  }, [isAuthenticated, router, pathname, nextPath]);
}
