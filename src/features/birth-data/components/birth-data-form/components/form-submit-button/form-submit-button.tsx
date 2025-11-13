import React from 'react';
import { Button, Box } from '@mui/material';
import { styles } from '../../birth-data-form.styles';
import type { BIRTH_DATA_FORM_CONFIG } from '../../birth-data-form.config';

interface FormSubmitButtonProps {
  isSubmitting: boolean;
  isChartLimitReached?: boolean;
  config: typeof BIRTH_DATA_FORM_CONFIG;
}

export function FormSubmitButton({
  isSubmitting,
  isChartLimitReached = false,
  config,
}: FormSubmitButtonProps) {
  return (
    <Box sx={styles.submitRow()}>
      <Button
        type={config.ui.button.type}
        variant={config.ui.button.variant}
        disabled={isSubmitting || isChartLimitReached}
      >
        {config.copy.button.continue}
      </Button>
    </Box>
  );
}
