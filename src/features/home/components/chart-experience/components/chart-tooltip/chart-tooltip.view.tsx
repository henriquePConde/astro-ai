'use client';

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { zodiacSymbols } from '@/shared/components/astro-chart/utils/zodiacUtils';
import { ZODIAC_SIGNS } from '@/shared/components/astro-chart/utils/constants';
import { styles } from './chart-tooltip.styles';
import type { ChartTooltipOverlayViewProps } from './chart-tooltip.types';

export function ChartTooltipOverlayView({ tooltip, config }: ChartTooltipOverlayViewProps) {
  const theme = useTheme();

  if (!tooltip) return null;

  const formatDegree = (degree: number) => degree.toFixed(config.ui.degree.decimalPlaces);

  let content: React.ReactNode = null;

  switch (tooltip.kind) {
    case config.kinds.planet: {
      const degree = tooltip.degree ?? 0;
      const signIdx = ((Math.floor(degree / 30) % 12) + 12) % 12;
      const signLabel = tooltip.signLabel ?? ZODIAC_SIGNS[signIdx];

      content = (
        <>
          <Typography sx={styles.contentText()(theme)}>
            {tooltip.symbol} {tooltip.name}
          </Typography>
          {signLabel && (
            <Typography>
              {config.copy.in} {signLabel}
            </Typography>
          )}
          {tooltip.house != null && (
            <Typography>
              {config.copy.house} {tooltip.house}
            </Typography>
          )}
          <Typography sx={styles.clickHint()(theme)}>{config.copy.clickToAsk}</Typography>
        </>
      );
      break;
    }
    case config.kinds.house:
      content = (
        <>
          <Typography sx={styles.contentText()(theme)}>
            {config.copy.house} {tooltip.number}
          </Typography>
          <Typography sx={styles.clickHint()(theme)}>{config.copy.clickToAsk}</Typography>
        </>
      );
      break;
    case config.kinds.sign: {
      const idx = tooltip.index;
      const name = ZODIAC_SIGNS[idx] ?? `${config.copy.sign} ${idx + 1}`;
      content = (
        <>
          <Typography sx={styles.contentText()(theme)}>
            {zodiacSymbols[idx]} {name}
          </Typography>
          <Typography sx={styles.clickHint()(theme)}>{config.copy.clickToAsk}</Typography>
        </>
      );
      break;
    }
    case config.kinds.aspect:
      content = (
        <>
          <Typography sx={styles.contentText()(theme)}>{tooltip.type}</Typography>
          {(tooltip.p1 || tooltip.p2) && (
            <Typography>
              {tooltip.p1}
              {tooltip.p2 && `${config.copy.separator}${tooltip.p2}`}
            </Typography>
          )}
          <Typography sx={styles.clickHint()(theme)}>{config.copy.clickToAsk}</Typography>
        </>
      );
      break;
  }

  return <Box sx={styles.tooltip(tooltip.x, tooltip.y)(theme)}>{content}</Box>;
}
