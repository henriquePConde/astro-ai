import type { TooltipState } from '@/features/home/components/chart-experience/context/tooltip.types';

export interface ChartTooltipOverlayViewProps {
  tooltip: TooltipState;
  onClose: () => void;
}
