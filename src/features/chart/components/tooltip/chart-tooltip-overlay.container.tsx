'use client';

import { useTooltip } from '@/features/home/components/chart-experience/context/tooltip.context';
import { ChartTooltipOverlayView } from './chart-tooltip-overlay.view';

export function ChartTooltipOverlayContainer() {
  const { tooltip, hideTooltip } = useTooltip();

  return <ChartTooltipOverlayView tooltip={tooltip} onClose={hideTooltip} />;
}
