'use client';

import { Box, Typography } from '@mui/material';
import { ZODIAC_SIGNS } from '@/shared/components/astro-chart/utils/constants';
import { getSignLabel } from '@/shared/components/astro-chart/utils/signLabel';
import { styles } from './chart-tooltip-overlay.styles';
import type { ChartTooltipOverlayViewProps } from './chart-tooltip-overlay.types';

export function ChartTooltipOverlayView({ tooltip, onClose }: ChartTooltipOverlayViewProps) {
  if (!tooltip) return null;

  return (
    <Box sx={styles.tooltip({ x: tooltip.x, y: tooltip.y })}>
      {tooltip.kind === 'planet' && (
        <>
          <Typography variant="subtitle2" sx={styles.title()}>
            {tooltip.symbol} {tooltip.name}
          </Typography>
          <Typography variant="body2">
            {tooltip.degree.toFixed(2)}° in {getSignLabel(tooltip.degree, tooltip.signLabel)}
          </Typography>
          {tooltip.house != null && <Typography variant="body2">House {tooltip.house}</Typography>}
        </>
      )}

      {tooltip.kind === 'house' && (
        <>
          <Typography variant="subtitle2" sx={styles.title()}>
            House {tooltip.number}
          </Typography>
          <Typography variant="body2">Cusp at {tooltip.degree.toFixed(2)}°</Typography>
        </>
      )}

      {tooltip.kind === 'sign' && (
        <>
          <Typography variant="subtitle2" sx={styles.title()}>
            {ZODIAC_SIGNS[tooltip.index] ?? 'Sign'}
          </Typography>
        </>
      )}

      {tooltip.kind === 'aspect' && (
        <>
          <Typography variant="subtitle2" sx={styles.title()}>
            {tooltip.type.toUpperCase()}
          </Typography>
          {(tooltip.p1 || tooltip.p2) && (
            <Typography variant="body2">
              {tooltip.p1}
              {tooltip.p2 && ` – ${tooltip.p2}`}
            </Typography>
          )}
          {typeof tooltip.angle === 'number' && (
            <Typography variant="body2">Angle {tooltip.angle.toFixed(2)}°</Typography>
          )}
        </>
      )}

      <Box sx={styles.closeButton()} onClick={onClose}>
        close
      </Box>
    </Box>
  );
}
