import type { ChartData, BirthChartData } from '@/features/home/types/chart.types';
import type { ChartData as WheelChartData } from '@/shared/components/astro-chart/types';

export interface ChartSectionContainerProps {
  chartData: ChartData;
  birthData: BirthChartData;
  isExpanded: boolean;
  isDragging: boolean;
  splitPosition?: number;
  enableMobileInteractions?: boolean;
}

export interface ChartSectionViewProps {
  wheelData: WheelChartData;
  chartData: ChartData;
  birthData: BirthChartData;
  isExpanded: boolean;
  isDragging: boolean;
  splitPosition?: number;
  enableMobileInteractions?: boolean;
}
