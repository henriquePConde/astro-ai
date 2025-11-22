'use client';

import { Box, useTheme } from '@mui/material';
import { styles } from './chart-detail-page.styles';
import type { ChartDetailPageViewProps } from './chart-detail-page.types';

export function ChartDetailPageView({
  headerContent,
  solarSystemContent,
  chartExperienceContent,
}: ChartDetailPageViewProps) {
  const theme = useTheme();

  return (
    <Box sx={styles.root()(theme)}>
      <Box sx={styles.header()(theme)}>{headerContent}</Box>
      <Box sx={styles.canvas()(theme)}>{solarSystemContent}</Box>
      {chartExperienceContent && (
        <Box sx={styles.chartExperience()(theme)}>{chartExperienceContent}</Box>
      )}
    </Box>
  );
}
