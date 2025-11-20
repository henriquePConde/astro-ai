import React from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import { styles } from '../../birth-data-form.styles';
import type { BIRTH_DATA_FORM_CONFIG } from '../../birth-data-form.config';

interface FormSubmitButtonProps {
  isSubmitting: boolean;
  isChartLimitReached?: boolean;
  isValid: boolean;
  config: typeof BIRTH_DATA_FORM_CONFIG;
}

export function FormSubmitButton({
  isSubmitting,
  isChartLimitReached = false,
  isValid,
  config,
}: FormSubmitButtonProps) {
  return (
    <Box sx={styles.submitRow()}>
      <Button
        type={config.ui.button.type}
        variant={config.ui.button.variant}
        disabled={isSubmitting || isChartLimitReached || !isValid}
        sx={styles.submitButton()}
      >
        <Box sx={styles.submitContentWrapper()}>
          <Box sx={{ visibility: isSubmitting ? 'hidden' : 'visible' }}>
            {config.copy.button.continue}
          </Box>
        </Box>
        {isSubmitting && (
          <Box sx={styles.submitSpinnerOverlay()}>
            <CircularProgress size={20} />
          </Box>
        )}
      </Button>
    </Box>
  );
}
