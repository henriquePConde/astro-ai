import { useState, useEffect } from 'react';
import type { ChartData } from '../../astro-chart/types';
import { PDF_PREVIEW_CONFIG } from '../pdf-preview.config';

/**
 * Hook for managing PDF ready state.
 * Component-level hook for local UI state only.
 */
export function usePdfReady(
  reportData: Record<string, string>,
  chartData: ChartData | null | undefined,
  chartImgUrl: string | null,
) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (reportData && Object.keys(reportData).length > 0) {
      if (chartData) {
        if (chartImgUrl) {
          setIsReady(true);
        } else {
          const timer = setTimeout(() => {
            setIsReady(true);
          }, PDF_PREVIEW_CONFIG.timing.chartConversionDelay);
          return () => clearTimeout(timer);
        }
      } else {
        setIsReady(true);
      }
    }
  }, [reportData, chartData, chartImgUrl]);

  return isReady;
}
