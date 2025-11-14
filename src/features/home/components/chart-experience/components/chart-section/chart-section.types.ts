import type { ChartData } from '@/features/home/types/chart.types';
import type { ChartData as WheelChartData } from '@/shared/components/astro-chart/types';

export interface ChartSectionContainerProps {
  chartData: ChartData;
  isExpanded: boolean;
  isDragging: boolean;
  splitPosition?: number;
}

export interface ChartSectionViewProps {
  wheelData: WheelChartData;
  isExpanded: boolean;
  isDragging: boolean;
  splitPosition?: number;
}
