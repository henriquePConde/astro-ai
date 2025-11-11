import type { ChartData, BirthChartData } from '@/features/home/types/chart.types';
import type { SECTION_CONTENT_CONFIG } from './section-content.config';

export interface SectionContentViewProps {
  activeSection: string;
  chartData: ChartData | null;
  birthData: BirthChartData | null;
  sections: Record<string, string>;
  hasSections: boolean;
  isGenerating: boolean;
  error: string | null;
  onGenerateReport: () => void;
  onDownloadPdf: () => void;
  config: typeof SECTION_CONTENT_CONFIG;
}

export interface SectionContentContainerProps {
  activeSection: string;
  chartData: ChartData | null;
  birthData: BirthChartData | null;
  reportData?: Record<string, string>;
  isGenerating: boolean;
  error: string | null;
  onGenerateReport: () => void;
  onDownloadPdf: () => void;
}
