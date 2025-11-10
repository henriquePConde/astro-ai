import { BirthChartData } from '@/features/home/types/chart.types';
import type { DataSectionTab } from '../../data-section.types';

export interface SectionContentViewProps {
  activeTab: DataSectionTab;
  chartData: any;
  birthData: BirthChartData | null;
  isGenerating: boolean;
  error: string | null;
  sections: Record<string, string>;
  onGenerateReport: () => void;
  onDownloadPdf?: () => void;
  canDownloadPdf?: boolean;
}
