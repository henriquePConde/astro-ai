import type { BirthChartData } from '@/features/home/types/chart.types';

export type DataSectionTab = 'ai' | 'report';

export interface DataSectionContainerProps {
  chartData: any; // Replace with concrete ChartData type if available
  isExpanded: boolean;
  isDragging: boolean;
  splitPosition: number;
  birthData: BirthChartData | null;
}

export interface DataSectionViewProps extends DataSectionContainerProps {
  activeTab: DataSectionTab;
  onTabChange: (tab: DataSectionTab) => void;
  isGenerating: boolean;
  error: string | null;
  sections: Record<string, string>;
  onGenerateReport: () => void;
}
