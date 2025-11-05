'use client';

import { Button, Box } from '@mui/material';
import { styles } from './control-buttons.styles';
import type { ControlButtonsProps } from './control-buttons.types';

export function ControlButtonsView({ onNewChart }: ControlButtonsProps) {
  return (
    <Box sx={styles.container()}>
      <Button onClick={onNewChart} sx={styles.button()}>
        New Chart
      </Button>
    </Box>
  );
}

