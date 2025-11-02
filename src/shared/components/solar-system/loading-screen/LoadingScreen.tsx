'use client';

import { Box, Typography } from '@mui/material';
import { styles } from './loading-screen.styles';
import type { LoadingScreenProps } from './loading-screen.types';

export function LoadingScreen({ progress, opacity }: LoadingScreenProps) {
  return (
    <Box sx={styles.root(opacity)}>
      <Typography sx={styles.text()}>Loading... {Math.floor(progress)}%</Typography>
    </Box>
  );
}
