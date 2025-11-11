'use client';

import { FormControlLabel, Switch, Tooltip, Box, useTheme } from '@mui/material';
import { styles } from './chart-interactions-switcher.styles';
import type { ChartInteractionsSwitcherViewProps } from './chart-interactions-switcher.types';

export function ChartInteractionsSwitcherView({
  enabled,
  onToggle,
}: ChartInteractionsSwitcherViewProps) {
  const theme = useTheme();

  return (
    <Box sx={styles.container()(theme)}>
      <Tooltip title="Toggle interactive tooltips for planets, houses, signs, and aspects">
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={enabled}
              onChange={(e) => onToggle(e.target.checked)}
              sx={styles.switch()(theme)}
            />
          }
          label="Interactions"
          sx={styles.label()(theme)}
        />
      </Tooltip>
    </Box>
  );
}
