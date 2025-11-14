'use client';

import { Box, Typography } from '@mui/material';
import { ZODIAC_SIGNS } from '@/shared/components/astro-chart/utils/constants';
import { getSignLabel } from '@/shared/components/astro-chart/utils/signLabel';
import { styles } from './chart-tooltip-overlay.styles';
import type { ChartTooltipOverlayViewProps } from './chart-tooltip-overlay.types';

export function ChartTooltipOverlayView({
  tooltip,
  onClose,
  config,
}: ChartTooltipOverlayViewProps) {
  if (!tooltip) return null;

  return (
    <Box sx={styles.tooltip({ x: tooltip.x, y: tooltip.y })}>
      {tooltip.kind === 'planet' && (
        <>
          <Typography variant={config.ui.typography.title.variant} sx={styles.title()}>
            {tooltip.symbol} {tooltip.name}
          </Typography>
          <Typography variant={config.ui.typography.content.variant}>
            {tooltip.degree.toFixed(config.ui.formatting.degree.decimalPlaces)}
            {config.ui.formatting.degree.symbol} {config.copy.planet.in}{' '}
            {getSignLabel(tooltip.degree, tooltip.signLabel)}
          </Typography>
          {tooltip.house != null && (
            <Typography variant={config.ui.typography.content.variant}>
              {config.copy.house.label} {tooltip.house}
            </Typography>
          )}
        </>
      )}

      {tooltip.kind === 'house' && (
        <>
          <Typography variant={config.ui.typography.title.variant} sx={styles.title()}>
            {config.copy.house.label} {tooltip.number}
          </Typography>
          <Typography variant={config.ui.typography.content.variant}>
            {config.copy.house.cusp}{' '}
            {tooltip.degree.toFixed(config.ui.formatting.degree.decimalPlaces)}
            {config.ui.formatting.degree.symbol}
          </Typography>
        </>
      )}

      {tooltip.kind === 'sign' && (
        <>
          <Typography variant={config.ui.typography.title.variant} sx={styles.title()}>
            {ZODIAC_SIGNS[tooltip.index] ?? config.copy.sign.fallback}
          </Typography>
        </>
      )}

      {tooltip.kind === 'aspect' && (
        <>
          <Typography variant={config.ui.typography.title.variant} sx={styles.title()}>
            {config.ui.formatting.aspect.transform === 'uppercase'
              ? tooltip.type.toUpperCase()
              : tooltip.type}
          </Typography>
          {(tooltip.p1 || tooltip.p2) && (
            <Typography variant={config.ui.typography.content.variant}>
              {tooltip.p1}
              {tooltip.p2 && ` – ${tooltip.p2}`}
            </Typography>
          )}
          {typeof tooltip.angle === 'number' && (
            <Typography variant={config.ui.typography.content.variant}>
              {config.copy.aspect.angle}{' '}
              {tooltip.angle.toFixed(config.ui.formatting.degree.decimalPlaces)}
              {config.ui.formatting.degree.symbol}
            </Typography>
          )}
        </>
      )}

      <Box sx={styles.closeButton()} onClick={onClose}>
        {config.copy.close}
      </Box>
    </Box>
  );
}
