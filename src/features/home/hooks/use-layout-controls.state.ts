'use client';

import { useState, useCallback } from 'react';
import { MouseEvent } from 'react';

export interface UseLayoutControlsReturn {
  isExpanded: boolean;
  isDragging: boolean;
  splitPosition: number;
  handleDragStart: () => void;
  handleDrag: (e: MouseEvent) => void;
  handleDragEnd: () => void;
  toggleExpand: () => void;
}

export function useLayoutControls(): UseLayoutControlsReturn {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50); // percentage

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    document.body.classList.add('select-none');
  }, []);

  const handleDrag = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const windowWidth = window.innerWidth;
      const percentage = (e.clientX / windowWidth) * 100;

      // Limit the split position between 30% and 70%
      const limitedPercentage = Math.min(Math.max(percentage, 30), 70);
      setSplitPosition(limitedPercentage);
    },
    [isDragging],
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    document.body.classList.remove('select-none');
  }, []);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return {
    isExpanded,
    isDragging,
    splitPosition,
    handleDragStart,
    handleDrag,
    handleDragEnd,
    toggleExpand,
  };
}

