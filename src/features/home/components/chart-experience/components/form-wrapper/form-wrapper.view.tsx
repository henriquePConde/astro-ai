'use client';

import { Box, useTheme } from '@mui/material';
import { BirthDataFormContainer } from '@/features/birth-data';
import { styles } from './form-wrapper.styles';
import type { FormWrapperViewProps } from './form-wrapper.types';

export function FormWrapperView({ onFormSubmit }: FormWrapperViewProps) {
  const theme = useTheme();

  return (
    <Box sx={styles.container()(theme)}>
      <BirthDataFormContainer onSubmit={onFormSubmit} />
    </Box>
  );
}
