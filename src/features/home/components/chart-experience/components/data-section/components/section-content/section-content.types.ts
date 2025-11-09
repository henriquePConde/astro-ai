import type { BirthChartData } from '@/features/home/types/chart.types';
import type { DataSectionTab } from '../../data-section.types';

export interface SectionContentViewProps {
  activeTab: DataSectionTab;
  chartData: any; // use concrete ChartData when available
  birthData: BirthChartData | null;
  isGenerating: boolean;
  error: string | null;
  sections: Record<string, string>;
  onGenerateReport: () => void;
}
