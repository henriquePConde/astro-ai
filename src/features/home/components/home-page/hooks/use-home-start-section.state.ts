'use client';

import { useSearchParams } from 'next/navigation';

export interface UseHomeStartSectionReturn {
  startAtForm: boolean;
}

/**
 * Reads the home page start section from the URL (e.g. /?startSection=form)
 * and exposes a simple boolean flag that tells the intro layout to jump
 * directly to the birth chart form section.
 */
export function useHomeStartSection(): UseHomeStartSectionReturn {
  const searchParams = useSearchParams();
  const startSection = searchParams.get('startSection');

  return {
    startAtForm: startSection === 'form',
  };
}
