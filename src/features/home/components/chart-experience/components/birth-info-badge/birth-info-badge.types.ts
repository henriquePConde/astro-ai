import type { BirthChartData } from '@/features/home/types/chart.types';
import type { BIRTH_INFO_BADGE_CONFIG } from './birth-info-badge.config';

export interface BirthInfoBadgeContainerProps {
  birthData: BirthChartData | null;
}

export interface BirthInfoBadgeViewProps extends BirthInfoBadgeContainerProps {
  config: typeof BIRTH_INFO_BADGE_CONFIG;
}
