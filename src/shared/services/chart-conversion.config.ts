/**
 * Service configuration for chart conversion
 * Separate from UI config following architecture guidelines
 */

import type { ChartConversionConfig } from './chart-conversion.service';

export const CHART_CONVERSION_CONFIG: ChartConversionConfig = {
  chartConversionDelay: 8000,
  svgRetryDelay: 300,
  maxRetries: 15,
  fontLoadTimeout: 3000,
  renderStabilizationDelay: 1000,
  offscreenWidth: 800,
  offscreenHeight: 800,
  backgroundColor: 'rgb(13,12,34)',
  blobType: 'image/svg+xml;charset=utf-8',
  imageType: 'image/png',
} as const;
