import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Hook that handles URL error parameter cleanup when user becomes authenticated.
 * Prevents showing error messages when auth succeeds after a transient error.
 * UI state hook - follows the *.state.ts pattern.
 */
export function useUrlErrorCleanup(isAuthenticated: boolean) {
  const router = useRouter();
  const [urlError, setUrlError] = useState<string | null>(null);

  // Read error from the URL on mount without useSearchParams to avoid Suspense requirement.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const current = new URL(window.location.href);
      setUrlError(current.searchParams.get('error'));
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && urlError) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      router.replace(newUrl.pathname + newUrl.search);
    }
  }, [isAuthenticated, urlError, router]);

  return urlError;
}
