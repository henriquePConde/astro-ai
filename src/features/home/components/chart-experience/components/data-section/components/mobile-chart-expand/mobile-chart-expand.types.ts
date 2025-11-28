import type { BirthChartData, ChartData } from '@/features/home/types/chart.types';
import type { MOBILE_CHART_EXPAND_CONFIG } from './mobile-chart-expand.config';
import type { CHART_INTERACTIONS_HINT_CONFIG } from '../../../chart-interactions-hint/chart-interactions-hint.config';

export interface MobileChartExpandViewProps {
  isExpanded: boolean;
  onClose: () => void;
  chartData: ChartData;
  birthData: BirthChartData;
  config: typeof MOBILE_CHART_EXPAND_CONFIG;
  hintConfig: typeof CHART_INTERACTIONS_HINT_CONFIG;
  interactionsOpen: boolean;
  onToggleInteractions: () => void;
  chartKey: number;
  hintLineColors: string[];
}
