import type { BirthChartData } from '@/features/home/types/chart.types';
import type { BirthChartReportSections } from '@/features/home/services/birth-chart-report.service';

export type DataSectionTab = 'ai' | 'report';

export interface DataSectionContainerProps {
  chartData: any; // use concrete ChartData when available
  isExpanded: boolean;
  isDragging: boolean;
  splitPosition: number;
  birthData: BirthChartData | null;
  initialReport?: {
    id: string;
    content: Record<string, string>;
    createdAt: Date;
  };
  initialMessages?: Array<{ role: 'user' | 'assistant'; content: string }>;
  chartId?: string;
}

export interface DataSectionViewProps {
  chartData: any;
  birthData: BirthChartData | null;
  isExpanded: boolean;
  isDragging: boolean;
  splitPosition: number;

  activeTab: DataSectionTab;
  onTabChange: (tab: DataSectionTab) => void;

  isGenerating: boolean;
  isDownloading: boolean;
  error: string | null;
  sections: BirthChartReportSections;
  hasSections: boolean;
  onGenerateReport: () => void;
  onDownloadPdf: () => void;
  jobProgress: number | null;
  initialMessages?: Array<{ role: 'user' | 'assistant'; content: string }>;
  chartId?: string;
}
