'use client';

import { Button, Box } from '@mui/material';
import { styles } from './control-buttons.styles';
import type { ControlButtonsProps } from './control-buttons.types';
import { ChartInteractionsSwitcher } from '../chart-interactions-switcher/chart-interactions-switcher';

export function ControlButtonsView({
  isExpanded,
  onToggleExpand,
  onNewChart,
}: ControlButtonsProps) {
  return (
    <Box sx={styles.container()}>
      <ChartInteractionsSwitcher />
      <Button onClick={onToggleExpand} sx={styles.button()}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </Button>
      <Button onClick={onNewChart} sx={styles.button()}>
        New Chart
      </Button>
    </Box>
  );
}
