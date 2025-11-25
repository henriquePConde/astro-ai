import type { BirthChartData, ChartData } from '@/features/home/types/chart.types';
import type { MOBILE_CHART_EXPAND_CONFIG } from './mobile-chart-expand.config';

export interface MobileChartExpandViewProps {
  isExpanded: boolean;
  onClose: () => void;
  chartData: ChartData;
  birthData: BirthChartData;
  config: typeof MOBILE_CHART_EXPAND_CONFIG;
}
