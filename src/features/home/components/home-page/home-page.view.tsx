'use client';

import { Box } from '@mui/material';
import { styles } from './home-page.styles';
import type { HomePageViewProps } from './home-page.types';

export function HomePageView({
  headerContent,
  solarSystemContent,
  introContent,
  chartExperienceContent,
}: HomePageViewProps) {
  return (
    <Box sx={styles.root()}>
      <Box sx={styles.header()}>{headerContent}</Box>
      <Box sx={styles.canvas()}>{solarSystemContent}</Box>
      {introContent && <Box sx={styles.intro()}>{introContent}</Box>}
      {chartExperienceContent && <Box sx={styles.chartExperience()}>{chartExperienceContent}</Box>}
    </Box>
  );
}
