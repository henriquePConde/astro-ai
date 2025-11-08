import type { ChartData, BirthChartData } from '@/features/home/types/chart.types';

export interface DataSectionProps {
  chartData: ChartData;
  isExpanded: boolean;
  isDragging: boolean;
  splitPosition: number;
  birthData: BirthChartData;
}
