'use client';

import { Box } from '@mui/material';
import { styles } from './home-page.styles';
import type { HomePageViewProps } from './home-page.types';

export function HomePageView({ headerContent, solarSystemContent }: HomePageViewProps) {
  return (
    <Box sx={styles.root()}>
      <Box sx={styles.header()}>{headerContent}</Box>
      <Box sx={styles.canvas()}>{solarSystemContent}</Box>
    </Box>
  );
}
