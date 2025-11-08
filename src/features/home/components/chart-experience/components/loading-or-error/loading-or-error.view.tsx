'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { styles } from './loading-or-error.styles';

export interface LoadingOrErrorProps {
  loading: boolean;
  error: string | null;
}

export function LoadingOrErrorView({ loading, error }: LoadingOrErrorProps) {
  if (loading) {
    return (
      <Box sx={styles.container()}>
        <CircularProgress size={24} sx={{ mb: 2 }} />
        <Typography sx={styles.container()}>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.error()}>
        <Typography sx={styles.error()}>Error: {error}</Typography>
      </Box>
    );
  }

  return null;
}
