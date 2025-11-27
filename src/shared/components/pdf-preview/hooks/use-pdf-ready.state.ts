import { useState, useEffect } from 'react';
import type { ChartData } from '../../astro-chart/types';
import { CHART_CONVERSION_CONFIG } from '@/shared/services/chart-conversion.config';

/**
 * Hook for managing PDF ready state.
 * Component-level hook for local UI state only.
 * Following architecture guidelines: pure UI state management.
 */
export function usePdfReady(
  reportData: Record<string, string>,
  chartData: ChartData | null | undefined,
  chartImgUrl: string | null,
  isGenerating?: boolean,
) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (reportData && Object.keys(reportData).length > 0) {
      if (chartData) {
        if (chartImgUrl && !isGenerating) {
          // Additional delay to ensure chart image is fully processed
          const stabilizationTimer = setTimeout(() => {
            setIsReady(true);
          }, CHART_CONVERSION_CONFIG.renderStabilizationDelay);
          return () => clearTimeout(stabilizationTimer);
        } else if (!chartImgUrl && !isGenerating) {
          // Fallback timeout if chart generation fails
          const fallbackTimer = setTimeout(() => {
            console.warn('PDF ready timeout reached without chart image');
            setIsReady(true);
          }, CHART_CONVERSION_CONFIG.chartConversionDelay + 2000);
          return () => clearTimeout(fallbackTimer);
        }
        // If still generating, keep waiting
      } else {
        // No chart data, ready immediately
        setIsReady(true);
      }
    } else {
      setIsReady(false);
    }
  }, [reportData, chartData, chartImgUrl, isGenerating]);

  return isReady;
}
