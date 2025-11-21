import type { ChartData } from '@/features/home/types/chart.types';
import type { BIG_THREE_BADGE_CONFIG } from './big-three-badge.config';

export interface BigThreeBadgeContainerProps {
  chartData: ChartData | null;
}

export interface BigThreeBadgeViewProps {
  sunSign: string | null;
  moonSign: string | null;
  ascendantSign: string | null;
  onAskAI: () => void;
  config: typeof BIG_THREE_BADGE_CONFIG;
}
