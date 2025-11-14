import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * Hook that handles URL error parameter cleanup when user becomes authenticated.
 * Prevents showing error messages when auth succeeds after a transient error.
 * UI state hook - follows the *.state.ts pattern.
 */
export function useUrlErrorCleanup(isAuthenticated: boolean) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error');

  useEffect(() => {
    if (isAuthenticated && urlError) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      router.replace(newUrl.pathname + newUrl.search);
    }
  }, [isAuthenticated, urlError, router]);

  return urlError;
}
