import { useState, useEffect } from 'react';

/**
 * Hook to track client-side mount state to prevent hydration mismatches.
 * Returns false during SSR and initial render, true after component mounts on client.
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
