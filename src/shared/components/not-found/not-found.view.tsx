'use client';

import { Box, Button, Typography } from '@mui/material';
import { styles } from './not-found.styles';
import type { NotFoundViewProps } from './not-found.types';

export function NotFoundView({ config, onGoHome }: NotFoundViewProps) {
  return (
    <Box sx={styles.root()}>
      <Box sx={styles.content(config.ui.maxWidth)}>
        <Typography variant="h3" component="h1" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
          {config.copy.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.7)' }}>
          {config.copy.description}
        </Typography>
        <Button variant="contained" size="large" onClick={onGoHome}>
          {config.copy.goHome}
        </Button>
      </Box>
    </Box>
  );
}
