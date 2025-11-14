import type { TooltipState } from '../../context/tooltip.types';
import type { CHART_TOOLTIP_CONFIG } from './chart-tooltip.config';

export interface ChartTooltipOverlayViewProps {
  tooltip: TooltipState;
  config: typeof CHART_TOOLTIP_CONFIG;
}
