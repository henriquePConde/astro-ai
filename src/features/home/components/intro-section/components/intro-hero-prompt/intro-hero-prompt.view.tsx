'use client';

import { Box, Typography } from '@mui/material';
import { styles } from './intro-hero-prompt.styles';
import type { IntroHeroPromptProps } from './intro-hero-prompt.types';

export function IntroHeroPromptView({ visible }: IntroHeroPromptProps) {
  console.log('[IntroHeroPromptView] Render:', { visible });

  return (
    <Box sx={styles.root(visible)}>
      <Box sx={styles.content()}>
        <Typography sx={styles.text()}>Scroll to Begin</Typography>
        <Box sx={styles.arrow()}>↓</Box>
      </Box>
    </Box>
  );
}
