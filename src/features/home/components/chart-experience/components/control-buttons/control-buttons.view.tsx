'use client';

import { Box, Button, useTheme } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import { styles } from './control-buttons.styles';
import type { ControlButtonsProps } from './control-buttons.types';

export function ControlButtonsView({
  isExpanded, // kept for API compatibility (not used for now)
  onToggleExpand, // kept for API compatibility (not used for now)
  onNewChart,
}: ControlButtonsProps) {
  const theme = useTheme();

  return (
    <Box sx={styles.root()(theme)}>
      <Button
        variant="contained"
        onClick={onNewChart}
        startIcon={<RefreshIcon />}
        sx={styles.newChartButton()(theme)}
      >
        New Chart
      </Button>

      {/*
        Collapse/expand button intentionally hidden for now.
        Keeping props so we can re-enable without API changes.
      */}
    </Box>
  );
}
