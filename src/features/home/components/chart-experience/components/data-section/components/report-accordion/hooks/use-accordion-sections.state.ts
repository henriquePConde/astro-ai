'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UseAccordionSectionsParams {
  sectionKeys: string[];
}

export interface UseAccordionSectionsReturn {
  openSections: Record<string, boolean>;
  toggleSection: (key: string) => void;
}

/**
 * Hook that manages accordion section open/close state.
 * Single responsibility: manage accordion section state and auto-open first section.
 */
export function useAccordionSections({
  sectionKeys,
}: UseAccordionSectionsParams): UseAccordionSectionsReturn {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = useCallback((key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  useEffect(() => {
    if (sectionKeys.length && Object.keys(openSections).length === 0) {
      setOpenSections({ [sectionKeys[0]]: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKeys.length]);

  return {
    openSections,
    toggleSection,
  };
}
