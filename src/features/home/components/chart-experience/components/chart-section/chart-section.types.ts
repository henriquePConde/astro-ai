import type { ChartData } from '@/features/home/types/chart.types';

export interface ChartSectionProps {
  chartData: ChartData;
  isExpanded: boolean;
  isDragging: boolean;
  splitPosition?: number;
}

