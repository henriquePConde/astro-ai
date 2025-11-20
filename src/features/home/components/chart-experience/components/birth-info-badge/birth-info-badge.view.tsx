'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { styles } from './birth-info-badge.styles';
import type { BirthInfoBadgeViewProps } from './birth-info-badge.types';

export function BirthInfoBadgeView({ birthData, config }: BirthInfoBadgeViewProps) {
  const theme = useTheme();

  if (!birthData) return null;

  const { name, city, nation, year, month, day, hour, minute } = birthData;

  const displayName = name?.trim() || config.copy.nameFallback;
  const location = [city, nation].filter(Boolean).join(', ');

  // Build a Date in local time for consistent formatting
  const date = new Date(year, month - 1, day, hour, minute);
  const dateStr = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  // Format time directly from hour/minute to avoid timezone conversion issues
  const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

  return (
    <Box sx={styles.root()(theme)}>
      <Typography component="div" sx={styles.name()(theme)}>
        {displayName}
      </Typography>
      {location && (
        <Typography component="div" sx={styles.meta()(theme)}>
          {location}
        </Typography>
      )}
      <Typography component="div" sx={styles.meta()(theme)}>
        {dateStr}
      </Typography>
      <Typography component="div" sx={styles.meta()(theme)}>
        {timeStr}
      </Typography>
    </Box>
  );
}
