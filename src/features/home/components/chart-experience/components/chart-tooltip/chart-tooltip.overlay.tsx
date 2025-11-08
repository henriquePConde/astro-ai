'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTooltip } from '../../context/tooltip.context';
import { zodiacSymbols } from '@/shared/components/astro-chart/utils/zodiacUtils';
import { styles } from './chart-tooltip.styles';

const zodiacNames = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

export const ChartTooltipOverlay: React.FC = () => {
  const { tooltip } = useTooltip();

  if (!tooltip) return null;

  let content: React.ReactNode = null;

  switch (tooltip.kind) {
    case 'planet': {
      const degree = tooltip.degree ?? 0;
      const signIdx = ((Math.floor(degree / 30) % 12) + 12) % 12;
      const signLabel = tooltip.signLabel ?? zodiacNames[signIdx];

      content = (
        <>
          <Typography sx={styles.contentText()}>
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
          <Typography sx={styles.contentText()}>House {tooltip.number}</Typography>
          <Typography>Cusp: {tooltip.degree.toFixed(2)}°</Typography>
        </>
      );
      break;
    case 'sign': {
      const idx = tooltip.index;
      const name = zodiacNames[idx] ?? `Sign ${idx + 1}`;
      content = (
        <>
          <Typography sx={styles.contentText()}>
            {zodiacSymbols[idx]} {name}
          </Typography>
        </>
      );
      break;
    }
    case 'aspect':
      content = (
        <>
          <Typography sx={styles.contentText()}>{tooltip.type}</Typography>
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

  return <Box sx={styles.tooltip(tooltip.x, tooltip.y)}>{content}</Box>;
};
