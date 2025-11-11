'use client';

import { useState, useEffect, useRef } from 'react';

export interface UseAccordionSectionHeightParams {
  isOpen: boolean;
  children: React.ReactNode;
}

export interface UseAccordionSectionHeightReturn {
  height: number;
  ref: React.RefObject<HTMLDivElement>;
}

/**
 * Hook that calculates and manages accordion section height for smooth animations.
 * Single responsibility: measure content height and provide it for animation.
 */
export function useAccordionSectionHeight({
  isOpen,
  children,
}: UseAccordionSectionHeightParams): UseAccordionSectionHeightReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && ref.current) {
      setHeight(ref.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen, children]);

  return {
    height,
    ref,
  };
}
