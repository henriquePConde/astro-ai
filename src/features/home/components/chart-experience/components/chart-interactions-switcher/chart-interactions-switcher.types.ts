import type { CHART_INTERACTIONS_SWITCHER_CONFIG } from './chart-interactions-switcher.config';

export interface ChartInteractionsSwitcherViewProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  config: typeof CHART_INTERACTIONS_SWITCHER_CONFIG;
}
