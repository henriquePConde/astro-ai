'use client';

import { useEffect, useState } from 'react';

export interface UseHomeStartSectionReturn {
  startAtForm: boolean;
}

/**
 * Reads the home page start section from the URL (e.g. /?startSection=form)
 * and exposes a simple boolean flag that tells the intro layout to jump
 * directly to the birth chart form section.
 *
 * Note: We intentionally avoid Next.js `useSearchParams` here because it
 * introduces a Suspense requirement that was causing the home page to
 * render a blank state in some cookie/session scenarios. Instead we read
 * from `window.location.search` on the client after hydration.
 */
export function useHomeStartSection(): UseHomeStartSectionReturn {
  const [startAtForm, setStartAtForm] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const startSection = params.get('startSection');
    setStartAtForm(startSection === 'form');
  }, []);

  return { startAtForm };
}
