'use client';

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { zodiacSymbols } from '@/shared/components/astro-chart/utils/zodiacUtils';
import { ZODIAC_SIGNS } from '@/shared/components/astro-chart/utils/constants';
import { styles } from './chart-tooltip.styles';
import type { ChartTooltipOverlayViewProps } from './chart-tooltip.types';

export function ChartTooltipOverlayView({ tooltip }: ChartTooltipOverlayViewProps) {
  const theme = useTheme();

  if (!tooltip) return null;

  let content: React.ReactNode = null;

  switch (tooltip.kind) {
    case 'planet': {
      const degree = tooltip.degree ?? 0;
      const signIdx = ((Math.floor(degree / 30) % 12) + 12) % 12;
      const signLabel = tooltip.signLabel ?? ZODIAC_SIGNS[signIdx];

      content = (
        <>
          <Typography sx={styles.contentText()(theme)}>
            {tooltip.symbol} {tooltip.name}
          </Typography>
          <Typography>
            {degree.toFixed(2)}° {signLabel && `in ${signLabel}`}
          </Typography>
          {tooltip.house != null && <Typography>House {tooltip.house}</Typography>}
        </>
      );
      break;
    }
    case 'house':
      content = (
        <>
          <Typography sx={styles.contentText()(theme)}>House {tooltip.number}</Typography>
          <Typography>Cusp: {tooltip.degree.toFixed(2)}°</Typography>
        </>
      );
      break;
    case 'sign': {
      const idx = tooltip.index;
      const name = ZODIAC_SIGNS[idx] ?? `Sign ${idx + 1}`;
      content = (
        <>
          <Typography sx={styles.contentText()(theme)}>
            {zodiacSymbols[idx]} {name}
          </Typography>
        </>
      );
      break;
    }
    case 'aspect':
      content = (
        <>
          <Typography sx={styles.contentText()(theme)}>{tooltip.type}</Typography>
          {(tooltip.p1 || tooltip.p2) && (
            <Typography>
              {tooltip.p1}
              {tooltip.p2 && ` – ${tooltip.p2}`}
            </Typography>
          )}
          {typeof tooltip.angle === 'number' && (
            <Typography>Angle: {tooltip.angle.toFixed(2)}°</Typography>
          )}
        </>
      );
      break;
  }

  return <Box sx={styles.tooltip(tooltip.x, tooltip.y)(theme)}>{content}</Box>;
}
