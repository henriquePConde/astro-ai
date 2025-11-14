'use client';

import { useTooltip } from '@/features/home/components/chart-experience/context/tooltip.context';
import { ChartTooltipOverlayView } from './chart-tooltip-overlay.view';
import { CHART_TOOLTIP_OVERLAY_CONFIG } from './chart-tooltip-overlay.config';

export function ChartTooltipOverlayContainer() {
  const { tooltip, hideTooltip } = useTooltip();

  return (
    <ChartTooltipOverlayView
      tooltip={tooltip}
      onClose={hideTooltip}
      config={CHART_TOOLTIP_OVERLAY_CONFIG}
    />
  );
}
