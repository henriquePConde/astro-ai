'use client';

import React from 'react';
import { Box } from '@mui/material';
import { styles } from './loading-indicator.styles';

export function LoadingIndicatorView() {
  return (
    <Box sx={styles.container()()}>
      <Box sx={styles.dotsContainer()()}>
        <Box sx={styles.dot('0s')()} />
        <Box sx={styles.dot('0.15s')()} />
        <Box sx={styles.dot('0.3s')()} />
      </Box>
    </Box>
  );
}
