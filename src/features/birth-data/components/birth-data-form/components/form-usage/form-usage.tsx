import React from 'react';
import { Typography } from '@mui/material';
import { styles } from '../../birth-data-form.styles';
import type { BIRTH_DATA_FORM_CONFIG } from '../../birth-data-form.config';

interface FormUsageProps {
  usage: { used: number; limit: number };
  config: typeof BIRTH_DATA_FORM_CONFIG;
}

export function FormUsage({ usage, config }: FormUsageProps) {
  return (
    <Typography sx={styles.usage()}>
      {config.copy.usage.prefix} {usage.used} {config.copy.usage.of} {usage.limit}{' '}
      {config.copy.usage.suffix}
    </Typography>
  );
}
