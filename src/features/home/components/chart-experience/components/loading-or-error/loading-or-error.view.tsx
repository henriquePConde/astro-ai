'use client';

import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { styles } from './loading-or-error.styles';
import type { LoadingOrErrorViewProps } from './loading-or-error.types';

export function LoadingOrErrorView({ loading, error }: LoadingOrErrorViewProps) {
  const theme = useTheme();

  if (loading) {
    return (
      <Box sx={styles.container()(theme)}>
        <CircularProgress size={24} sx={{ mb: 2 }} />
        <Typography sx={styles.container()(theme)}>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.error()(theme)}>
        <Typography sx={styles.error()(theme)}>Error: {error}</Typography>
      </Box>
    );
  }

  return null;
}
