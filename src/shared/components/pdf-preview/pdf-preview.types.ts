import type { ChartData } from '../astro-chart/types';
import type { PDF_PREVIEW_CONFIG } from './pdf-preview.config';

export interface PDFPreviewContainerProps {
  reportData?: Record<string, string>;
  chartData?: ChartData | null;
  isPublic?: boolean;
}

export interface PDFPreviewViewProps {
  reportData: Record<string, string>;
  chartData: ChartData | null;
  chartImgUrl: string | null;
  currentDate: string;
  isReady: boolean;
  sectionEntries: Array<[string, string]>;
  allSectionKeys: string[];
  totalPages: number;
  config: typeof PDF_PREVIEW_CONFIG;
  svgContainerRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  AstroWheelComponent: React.ComponentType<any>;
  MarkdownRendererComponent: React.ComponentType<any>;
  sectionLabels: Record<string, string>;
}

export interface EmptyStateViewProps {
  config: typeof PDF_PREVIEW_CONFIG;
}
