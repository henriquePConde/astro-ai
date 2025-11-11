import React from 'react';
import { Box } from '@mui/material';
import { styles } from '../../birth-data-form.styles';

interface FormShellProps {
  children: React.ReactNode;
}

export function FormShell({ children }: FormShellProps) {
  return (
    <Box sx={styles.shell()}>
      <Box sx={styles.stars()} />
      <Box sx={styles.glassOverlay()} />
      <Box sx={styles.content()}>{children}</Box>
    </Box>
  );
}
