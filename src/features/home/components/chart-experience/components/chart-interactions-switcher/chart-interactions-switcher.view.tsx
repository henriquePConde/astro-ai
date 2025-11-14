'use client';

import { FormControlLabel, Switch, Tooltip, Box, useTheme } from '@mui/material';
import { styles } from './chart-interactions-switcher.styles';
import type { ChartInteractionsSwitcherViewProps } from './chart-interactions-switcher.types';

export function ChartInteractionsSwitcherView({
  enabled,
  onToggle,
  config,
}: ChartInteractionsSwitcherViewProps) {
  const theme = useTheme();

  return (
    <Box sx={styles.container()(theme)}>
      <Tooltip title={config.copy.tooltip}>
        <FormControlLabel
          control={
            <Switch
              size={config.ui.switch.size}
              checked={enabled}
              onChange={(e) => onToggle(e.target.checked)}
              sx={styles.switch()(theme)}
            />
          }
          label={config.copy.label}
          sx={styles.label()(theme)}
        />
      </Tooltip>
    </Box>
  );
}
