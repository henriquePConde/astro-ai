import type { BirthChartData, ChartData } from '@/features/home/types/chart.types';
import type { MOBILE_CHART_SUMMARY_CONFIG } from './mobile-chart-summary.config';
import type { BIRTH_INFO_BADGE_CONFIG } from '../../../birth-info-badge/birth-info-badge.config';
import type { BIG_THREE_BADGE_CONFIG } from '../../../big-three-badge/big-three-badge.config';

export interface MobileChartSummaryViewProps {
  displayName: string;
  location: string | null;
  dateStr: string;
  timeStr: string;
  sunSign: string | null;
  moonSign: string | null;
  ascendantSign: string | null;
  onExpandChart?: () => void;
  onAskAI: () => void;
  config: typeof MOBILE_CHART_SUMMARY_CONFIG;
  birthInfoConfig: typeof BIRTH_INFO_BADGE_CONFIG;
  bigThreeConfig: typeof BIG_THREE_BADGE_CONFIG;
  openSections: {
    birth: boolean;
    astro: boolean;
    controls: boolean;
    expand: boolean;
  };
  onToggleSection: (key: 'birth' | 'astro' | 'controls' | 'expand') => void;
  birthMetaColors: [string, string, string];
  bigThreeColors: [string, string, string];
  hintLineColor: string;
}

export interface MobileChartSummaryContainerProps {
  chartData: ChartData;
  birthData: BirthChartData;
  onExpandChart?: () => void;
}
