import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from '../../birth-data-form.styles';
import type { BIRTH_DATA_FORM_CONFIG } from '../../birth-data-form.config';
import type { DailyUsage } from '@/features/reports/services/reports.service';
import { useUsageColor } from '@/shared/hooks/use-usage-color';

interface FormUsageProps {
  usage: DailyUsage;
  config: typeof BIRTH_DATA_FORM_CONFIG;
}

function formatUsageText(used: number, limit: number, label: string): string {
  return `${label}: ${used}/${limit}`;
}

export function FormUsage({ usage, config }: FormUsageProps) {
  const getChartsUsageColor = useUsageColor(usage.charts.used, usage.charts.limit);

  return (
    <Box sx={styles.usage()}>
      <Typography variant="body2" sx={{ color: getChartsUsageColor }}>
        {formatUsageText(usage.charts.used, usage.charts.limit, 'Charts generation daily limit')}
      </Typography>
    </Box>
  );
}
