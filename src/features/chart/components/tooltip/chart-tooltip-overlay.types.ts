import type { TooltipState } from '@/features/home/components/chart-experience/context/tooltip.types';
import type { CHART_TOOLTIP_OVERLAY_CONFIG } from './chart-tooltip-overlay.config';

export interface ChartTooltipOverlayViewProps {
  tooltip: TooltipState;
  onClose: () => void;
  config: typeof CHART_TOOLTIP_OVERLAY_CONFIG;
}
