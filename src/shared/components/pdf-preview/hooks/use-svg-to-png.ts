'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChartData } from '@/shared/components/astro-chart/types';
import { createChartConversionService } from '@/shared/services/chart-conversion.service';
import { CHART_CONVERSION_CONFIG } from '@/shared/services/chart-conversion.config';
import { PDF_PREVIEW_CONFIG } from '../pdf-preview.config';

/**
 * Hook for managing SVG to PNG conversion state.
 * Following architecture guidelines: this is a UI state hook only.
 * Complex conversion logic is delegated to the service layer.
 */
export function useSvgToPng(chartData: ChartData | null | undefined) {
  const [chartImgUrl, setChartImgUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const svgContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function generatePng() {
      if (!chartData) {
        setChartImgUrl(null);
        setIsGenerating(false);
        setError(null);
        return;
      }

      setIsGenerating(true);
      setError(null);

      try {
        // Use service layer for conversion logic
        const conversionService = createChartConversionService({
          ...CHART_CONVERSION_CONFIG,
          offscreenWidth: PDF_PREVIEW_CONFIG.dimensions.chart.offscreen.width,
          offscreenHeight: PDF_PREVIEW_CONFIG.dimensions.chart.offscreen.height,
          backgroundColor: PDF_PREVIEW_CONFIG.styles.colors.background.dark,
        });

        const result = await conversionService.convertSvgToPng(svgContainerRef);

        if (!cancelled) {
          if (result.success && result.dataUrl) {
            setChartImgUrl(result.dataUrl);
            setError(null);
            console.log('Chart PNG generated successfully');
          } else {
            setError(result.error || 'Failed to generate chart PNG');
            console.error('Chart conversion failed:', result.error);
          }
          setIsGenerating(false);
        }
      } catch (error) {
        if (!cancelled) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          setError(errorMessage);
          setIsGenerating(false);
          console.error('Error in chart conversion:', error);
        }
      }
    }

    generatePng();

    return () => {
      cancelled = true;
    };
  }, [chartData]);

  return {
    chartImgUrl,
    svgContainerRef,
    isGenerating,
    error,
  };
}
