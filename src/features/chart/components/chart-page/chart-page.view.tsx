'use client';

import { Box, Typography, Alert, CircularProgress, Stack } from '@mui/material';
import type { ChartData } from '../../services/chart.service';
import AstroWheel from '@/shared/components/astro-chart/AstroWheel';
import { toWheelData } from '../../services/chart.mappers';

export function ChartPageView({
  form,
  chartData,
  chartApp,
  loading,
  error,
}: {
  form: React.ReactNode;
  chartData: ChartData | null;
  chartApp: React.ReactNode;
  loading?: boolean;
  error?: { message?: string } | null;
}) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Birth Chart
      </Typography>
      <Stack spacing={3}>
        <Box>{form}</Box>

        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
