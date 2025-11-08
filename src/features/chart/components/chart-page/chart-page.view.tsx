'use client';

import { Box, Typography, Alert, CircularProgress, Stack } from '@mui/material';
import { styles } from './chart-page.styles';
import type { ChartPageViewProps } from './chart-page.types';

export function ChartPageView({ form, chartData, chartApp, loading, error }: ChartPageViewProps) {
  return (
    <Box sx={styles.root()}>
      <Typography variant="h5" gutterBottom>
        Birth Chart
      </Typography>
      <Stack spacing={3}>
        <Box>{form}</Box>

        {loading && (
          <Box sx={styles.loadingContainer()}>
            <CircularProgress size={20} />
            <Typography>Calculating chart…</Typography>
          </Box>
        )}
        {error && <Alert severity="error">{error.message || 'Failed to calculate chart'}</Alert>}
        {chartData && chartApp}
      </Stack>
    </Box>
  );
}
