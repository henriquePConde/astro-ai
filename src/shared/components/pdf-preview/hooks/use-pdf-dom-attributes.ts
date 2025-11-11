import { useEffect } from 'react';

/**
 * Hook for updating DOM attributes based on PDF ready state.
 * Component-level hook for DOM side effects.
 */
export function usePdfDomAttributes(isReady: boolean) {
  useEffect(() => {
    const container = document.querySelector('.pdf-preview-container');
    if (container) {
      if (isReady) {
        container.setAttribute('data-pdf-ready', 'true');
      } else {
        container.setAttribute('data-pdf-ready', 'false');
      }
    }
  }, [isReady]);
}
