import type { BirthChartData } from '@/features/home/types/chart.types';
import type { BIRTH_CHART_REPORT_CONFIG } from './birth-chart-report.config';
import type { DailyUsage } from '@/features/reports/services/reports.service';

export interface BirthChartReportViewProps {
  birthData: BirthChartData | null;
  isGenerating: boolean;
  isDownloading: boolean;
  error: string | null;
  sections: Record<string, string>;
  hasSections: boolean;
  onGenerate: () => void;
  onDownloadPdf: () => void;
  handleGenerateClick: () => void;
  handleDownloadClick: () => void;
  generateButtonText: string;
  usage?: DailyUsage;
  config: typeof BIRTH_CHART_REPORT_CONFIG;
}

export interface BirthChartReportContainerProps {
  birthData: BirthChartData | null;
  isGenerating: boolean;
  isDownloading: boolean;
  error: string | null;
  sections: Record<string, string>;
  hasSections: boolean;
  onGenerate: () => void;
  onDownloadPdf: () => void;
}
