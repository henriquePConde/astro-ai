import type { CHART_INTERACTIONS_HINT_CONFIG } from './chart-interactions-hint.config';

export interface ChartInteractionsHintContainerProps {}

export interface ChartInteractionsHintViewProps {
  isOpen: boolean;
  interactionsEnabled: boolean;
  onToggle: () => void;
  config: typeof CHART_INTERACTIONS_HINT_CONFIG;
}
