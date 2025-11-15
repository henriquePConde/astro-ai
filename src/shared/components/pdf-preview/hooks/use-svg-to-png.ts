'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChartData } from '@/shared/components/astro-chart/types';
import { PDF_PREVIEW_CONFIG } from '../pdf-preview.config';

/**
 * Renders the offscreen AstroWheel SVG into a PNG data URL.
 * Critically: waits for fonts to load BEFORE snapshotting the SVG,
 * so glyphs (zodiac + planet symbols) are present in the PDF.
 */
export function useSvgToPng(chartData: ChartData | null | undefined) {
  const [chartImgUrl, setChartImgUrl] = useState<string | null>(null);
  const svgContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let currentObjectUrl: string | null = null;

    const {
      timing: { chartConversionDelay, svgRetryDelay, maxRetries },
      dimensions: {
        chart: {
          offscreen: { width: OFFSCREEN_WIDTH, height: OFFSCREEN_HEIGHT },
        },
      },
      styles: {
        svg: { blobType, imageType },
        colors: {
          background: { dark: BACKGROUND_COLOR },
        },
      },
    } = PDF_PREVIEW_CONFIG as any;

    async function waitForFonts() {
      try {
        if (typeof document !== 'undefined' && 'fonts' in document) {
          // Wait until all fonts used on the page are ready
          // @ts-ignore
          await (document as any).fonts.ready;
        }
      } catch (e) {
        // If fonts.ready is not supported, just ignore
        console.warn('document.fonts.ready not available or failed:', e);
      }
    }

    async function waitForSvg(): Promise<SVGSVGElement | null> {
      const start = Date.now();
      let attempts = 0;

      // Give the chart a bit of time to render plus a few retries
      while (!cancelled && attempts < maxRetries) {
        const svgEl = svgContainerRef.current?.querySelector('svg') as SVGSVGElement | null;
        if (svgEl) return svgEl;

        attempts += 1;
        await new Promise((resolve) => setTimeout(resolve, svgRetryDelay));
      }

      // Last chance: simple timeout
      const timeoutRemaining = chartConversionDelay - (Date.now() - start);
      if (timeoutRemaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, timeoutRemaining));
      }

      return (svgContainerRef.current?.querySelector('svg') as SVGSVGElement | null) ?? null;
    }

    async function generatePng() {
      if (!chartData) {
        setChartImgUrl(null);
        return;
      }

      // 1. Wait for fonts to be ready so glyphs render correctly
      await waitForFonts();

      if (cancelled) return;

      // 2. Wait for the SVG element to actually exist in the offscreen container
      const svgEl = await waitForSvg();
      if (!svgEl || cancelled) {
        console.warn('SVG element for chart PNG not found before timeout');
        return;
      }

      // 3. Serialize SVG
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgEl);

      const blob = new Blob([svgString], {
        type: blobType || 'image/svg+xml;charset=utf-8',
      });

      currentObjectUrl = URL.createObjectURL(blob);

      // 4. Load SVG into <img>, then draw to canvas
      const img = new Image();
      img.crossOrigin = 'anonymous';

      const loadImg = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (err) => reject(err);
      });

      img.src = currentObjectUrl;

      try {
        await loadImg;
      } catch (err) {
        console.error('Error loading SVG into image for chart PNG:', err);
        return;
      }

      if (cancelled) return;

      const canvas = document.createElement('canvas');
      canvas.width = OFFSCREEN_WIDTH;
      canvas.height = OFFSCREEN_HEIGHT;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('2D context not available for chart PNG');
        return;
      }

      // Background (dark night-sky)
      ctx.fillStyle = BACKGROUND_COLOR || '#000000';
      ctx.fillRect(0, 0, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);

      // Draw SVG image into canvas
      ctx.drawImage(img, 0, 0, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);

      // 5. Get PNG data URL
      const dataUrl = canvas.toDataURL(imageType || 'image/png');
      if (!cancelled) {
        setChartImgUrl(dataUrl);
      }
    }

    generatePng().catch((err) => {
      console.error('Failed to generate chart PNG:', err);
    });

    return () => {
      cancelled = true;
      if (currentObjectUrl) {
        URL.revokeObjectURL(currentObjectUrl);
      }
    };
  }, [chartData]);

  return { chartImgUrl, svgContainerRef };
}
