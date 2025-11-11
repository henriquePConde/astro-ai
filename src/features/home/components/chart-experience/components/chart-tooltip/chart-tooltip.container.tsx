'use client';

import { useTooltip } from '../../context/tooltip.context';
import { ChartTooltipOverlayView } from './chart-tooltip.view';

export function ChartTooltipOverlayContainer() {
  const { tooltip } = useTooltip();

  return <ChartTooltipOverlayView tooltip={tooltip} />;
}
