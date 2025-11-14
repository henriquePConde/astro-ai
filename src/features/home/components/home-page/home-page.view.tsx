'use client';

import { Box, useTheme } from '@mui/material';
import { styles } from './home-page.styles';
import type { HomePageViewProps } from './home-page.types';

export function HomePageView({
  headerContent,
  solarSystemContent,
  introContent,
  chartExperienceContent,
  currentSection,
}: HomePageViewProps) {
  const theme = useTheme();
  const isIntroInteractive = currentSection !== 2;

  return (
    <Box sx={styles.root()(theme)}>
      <Box sx={styles.header()(theme)}>{headerContent}</Box>
      <Box sx={styles.canvas()(theme)}>{solarSystemContent}</Box>
      {introContent && <Box sx={styles.intro(isIntroInteractive)(theme)}>{introContent}</Box>}
      {chartExperienceContent && (
        <Box sx={styles.chartExperience()(theme)}>{chartExperienceContent}</Box>
      )}
    </Box>
  );
}
