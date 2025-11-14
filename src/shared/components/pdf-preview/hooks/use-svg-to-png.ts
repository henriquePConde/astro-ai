import { useState, useEffect, useRef } from 'react';
import type { ChartData } from '../../astro-chart/types';
import { PDF_PREVIEW_CONFIG } from '../pdf-preview.config';

/**
 * Hook for converting SVG chart to PNG image.
 * Component-level hook for SVG to PNG conversion logic.
 */
export function useSvgToPng(chartData: ChartData | null | undefined) {
  const [chartImgUrl, setChartImgUrl] = useState<string | null>(null);
  const [tried, setTried] = useState(0);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartImgUrl) return;
    if (!svgContainerRef.current) return;
    const svg = svgContainerRef.current.querySelector('svg');
    if (!svg) {
      if (tried < PDF_PREVIEW_CONFIG.timing.maxRetries) {
        setTimeout(() => setTried((t) => t + 1), PDF_PREVIEW_CONFIG.timing.svgRetryDelay);
      }
      return;
    }
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: PDF_PREVIEW_CONFIG.styles.svg.blobType,
    });
    const url = URL.createObjectURL(svgBlob);
    const img = new window.Image();

    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = PDF_PREVIEW_CONFIG.styles.svg.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const imgURL = canvas.toDataURL(PDF_PREVIEW_CONFIG.styles.svg.imageType);
        setChartImgUrl(imgURL);
        URL.revokeObjectURL(url);
      }
    };
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [chartData, tried, chartImgUrl]);

  return {
    chartImgUrl,
    svgContainerRef,
  };
}
