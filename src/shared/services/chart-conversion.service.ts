/**
 * Service for converting SVG charts to PNG for PDF generation
 * Following the service layer pattern from architecture guidelines
 */

import {
  waitForFontsReady,
  createCanvasFromSvg,
  validateSvgContent,
} from '@/shared/utils/chart-rendering.utils';

export interface ChartConversionConfig {
  chartConversionDelay: number;
  svgRetryDelay: number;
  maxRetries: number;
  fontLoadTimeout: number;
  renderStabilizationDelay: number;
  offscreenWidth: number;
  offscreenHeight: number;
  backgroundColor: string;
  blobType: string;
  imageType: string;
}

export interface ChartConversionResult {
  success: boolean;
  dataUrl: string | null;
  error?: string;
  retryCount: number;
}

/**
 * Service class for handling chart SVG to PNG conversion
 */
export class ChartConversionService {
  constructor(private config: ChartConversionConfig) {}

  /**
   * Converts an SVG element to PNG data URL with retry logic
   */
  async convertSvgToPng(
    svgContainerRef: React.RefObject<HTMLDivElement | null>,
    retryCount: number = 0,
  ): Promise<ChartConversionResult> {
    try {
      // 1. Wait for fonts to be ready
      await waitForFontsReady(this.config.fontLoadTimeout);

      // 2. Wait for SVG element with validation
      const svgEl = await this.waitForValidSvg(svgContainerRef);
      if (!svgEl) {
        if (retryCount < 2) {
          console.log(`Retrying SVG conversion (attempt ${retryCount + 1})`);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return this.convertSvgToPng(svgContainerRef, retryCount + 1);
        }
        return {
          success: false,
          dataUrl: null,
          error: 'SVG element not found or invalid',
          retryCount,
        };
      }

      // 3. Convert to PNG using utility
      const dataUrl = await createCanvasFromSvg(
        svgEl,
        this.config.offscreenWidth,
        this.config.offscreenHeight,
        this.config.backgroundColor,
      );

      if (!dataUrl) {
        if (retryCount < 2) {
          console.log(`Retrying PNG generation (attempt ${retryCount + 1})`);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return this.convertSvgToPng(svgContainerRef, retryCount + 1);
        }
        return {
          success: false,
          dataUrl: null,
          error: 'Failed to generate PNG from SVG',
          retryCount,
        };
      }

      return {
        success: true,
        dataUrl,
        retryCount,
      };
    } catch (error) {
      console.error('Error in chart conversion:', error);
      if (retryCount < 2) {
        console.log(`Retrying after error (attempt ${retryCount + 1})`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return this.convertSvgToPng(svgContainerRef, retryCount + 1);
      }

      return {
        success: false,
        dataUrl: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        retryCount,
      };
    }
  }

  /**
   * Waits for a valid SVG element to be available
   */
  private async waitForValidSvg(
    svgContainerRef: React.RefObject<HTMLDivElement | null>,
  ): Promise<SVGSVGElement | null> {
    let attempts = 0;

    while (attempts < this.config.maxRetries) {
      const svgEl = svgContainerRef.current?.querySelector('svg') as SVGSVGElement | null;

      if (svgEl && validateSvgContent(svgEl)) {
        // Additional wait to ensure all SVG elements are fully rendered
        await new Promise((resolve) => setTimeout(resolve, 300));
        return svgEl;
      }

      attempts++;
      await new Promise((resolve) => setTimeout(resolve, this.config.svgRetryDelay));
    }

    // Last chance with timeout
    await new Promise((resolve) => setTimeout(resolve, this.config.chartConversionDelay));

    const finalSvg = svgContainerRef.current?.querySelector('svg') as SVGSVGElement | null;
    if (finalSvg) {
      console.warn('SVG found but may not be fully rendered');
    }
    return finalSvg;
  }
}

/**
 * Factory function to create chart conversion service with config
 */
export function createChartConversionService(
  config: ChartConversionConfig,
): ChartConversionService {
  return new ChartConversionService(config);
}
