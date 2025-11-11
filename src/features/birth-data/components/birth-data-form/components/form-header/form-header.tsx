import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from '../../birth-data-form.styles';
import type { BIRTH_DATA_FORM_CONFIG } from '../../birth-data-form.config';

interface FormHeaderProps {
  config: typeof BIRTH_DATA_FORM_CONFIG;
}

export function FormHeader({ config }: FormHeaderProps) {
  return (
    <Box sx={styles.header()}>
      <Typography component={config.ui.header.title.component} sx={styles.headerTitle()}>
        {config.copy.title}
      </Typography>
      <Typography component={config.ui.header.subtitle.component} sx={styles.headerSub()}>
        {config.copy.subtitle}
      </Typography>
    </Box>
  );
}
