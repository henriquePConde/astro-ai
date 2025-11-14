'use client';

import { useTooltip } from '../../context/tooltip.context';
import { CHART_TOOLTIP_CONFIG } from './chart-tooltip.config';
import { ChartTooltipOverlayView } from './chart-tooltip.view';

export function ChartTooltipOverlayContainer() {
  const { tooltip } = useTooltip();

  return <ChartTooltipOverlayView tooltip={tooltip} config={CHART_TOOLTIP_CONFIG} />;
}
