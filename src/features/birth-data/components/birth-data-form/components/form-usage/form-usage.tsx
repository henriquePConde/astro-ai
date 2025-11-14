import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from '../../birth-data-form.styles';
import type { BIRTH_DATA_FORM_CONFIG } from '../../birth-data-form.config';
import type { DailyUsage } from '@/features/reports/services/reports.service';

interface FormUsageProps {
  usage: DailyUsage;
  config: typeof BIRTH_DATA_FORM_CONFIG;
}

function formatUsageText(used: number, limit: number, label: string): string {
  return `${label}: ${used}/${limit}`;
}

export function FormUsage({ usage, config }: FormUsageProps) {
  return (
    <Box sx={styles.usage()}>
      <Typography variant="body2" color="text.secondary">
        {formatUsageText(usage.charts.used, usage.charts.limit, 'Charts')}
      </Typography>
    </Box>
  );
}
