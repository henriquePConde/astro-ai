'use client';

import { useCallback } from 'react';
import type { BirthChartData } from '@/features/home/types/chart.types';

export interface UseBirthChartReportHandlersParams {
  birthData: BirthChartData | null;
  isGenerating: boolean;
  hasSections: boolean;
  onGenerate: () => void;
  onDownloadPdf: () => void;
}

export interface UseBirthChartReportHandlersReturn {
  handleGenerateClick: () => void;
  handleDownloadClick: () => void;
}

/**
 * Hook that provides validated click handlers for birth chart report actions.
 * Single responsibility: validate conditions and call callbacks.
 */
export function useBirthChartReportHandlers({
  birthData,
  isGenerating,
  hasSections,
  onGenerate,
  onDownloadPdf,
}: UseBirthChartReportHandlersParams): UseBirthChartReportHandlersReturn {
  const handleGenerateClick = useCallback(() => {
    if (!birthData || isGenerating) return;
    onGenerate();
  }, [birthData, isGenerating, onGenerate]);

  const handleDownloadClick = useCallback(() => {
    if (!hasSections || isGenerating) return;
    onDownloadPdf();
  }, [hasSections, isGenerating, onDownloadPdf]);

  return {
    handleGenerateClick,
    handleDownloadClick,
  };
}
