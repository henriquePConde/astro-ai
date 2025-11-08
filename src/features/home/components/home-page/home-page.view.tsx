'use client';

import { Box } from '@mui/material';
import { styles } from './home-page.styles';
import type { HomePageViewProps } from './home-page.types';

export function HomePageView({
  headerContent,
  solarSystemContent,
  introContent,
  chartExperienceContent,
  currentSection,
}: HomePageViewProps) {
  const isIntroInteractive = currentSection !== 2;

  return (
    <Box sx={styles.root()}>
      <Box sx={styles.header()}>{headerContent}</Box>
      <Box sx={styles.canvas()}>{solarSystemContent}</Box>
      {introContent && <Box sx={styles.intro(isIntroInteractive)}>{introContent}</Box>}
      {chartExperienceContent && <Box sx={styles.chartExperience()}>{chartExperienceContent}</Box>}
    </Box>
  );
}
