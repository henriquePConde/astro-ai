'use client';

import { useMemo } from 'react';

export interface UseSectionContentStateParams {
  reportData?: Record<string, string>;
}

export interface UseSectionContentStateReturn {
  sections: Record<string, string>;
  hasSections: boolean;
}

/**
 * Hook that derives sections state from reportData.
 * Single responsibility: transform reportData into presentable sections state.
 */
export function useSectionContentState({
  reportData,
}: UseSectionContentStateParams): UseSectionContentStateReturn {
  return useMemo(() => {
    const sections = reportData ?? {};
    const hasSections = Object.keys(sections).length > 0;

    return {
      sections,
      hasSections,
    };
  }, [reportData]);
}
