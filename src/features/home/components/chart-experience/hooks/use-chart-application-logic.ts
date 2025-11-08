'use client';

import { useCallback } from 'react';
import { MouseEvent } from 'react';

export interface UseChartApplicationLogicProps {
  onDrag: (e: MouseEvent) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onToggleExpand: () => void;
  onNewChart: () => void;
}

export interface UseChartApplicationLogicReturn {
  handleDrag: (e: MouseEvent) => void;
  handleDragStart: () => void;
  handleDragEnd: () => void;
  handleToggleExpand: () => void;
  handleNewChart: () => void;
}

export function useChartApplicationLogic({
  onDrag,
  onDragStart,
  onDragEnd,
  onToggleExpand,
  onNewChart,
}: UseChartApplicationLogicProps): UseChartApplicationLogicReturn {
  const handleDrag = useCallback(onDrag, [onDrag]);
  const handleDragStart = useCallback(onDragStart, [onDragStart]);
  const handleDragEnd = useCallback(onDragEnd, [onDragEnd]);
  const handleToggleExpand = useCallback(onToggleExpand, [onToggleExpand]);
  const handleNewChart = useCallback(onNewChart, [onNewChart]);

  return {
    handleDrag,
    handleDragStart,
    handleDragEnd,
    handleToggleExpand,
    handleNewChart,
  };
}
