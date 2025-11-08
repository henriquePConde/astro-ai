'use client';

import { FormControlLabel, Switch, Tooltip, Box } from '@mui/material';
import { useOptionalChartInteractions } from '../../context/chart-interactions.context';
import { styles } from './chart-interactions-switcher.styles';

export function ChartInteractionsSwitcher() {
  const ctx = useOptionalChartInteractions();

  // If not inside provider (wrong place in tree), fail silently instead of crashing.
  if (!ctx) {
    // DEBUG: Show when context is missing
    return <Box sx={styles.debugBox()}>NO CONTEXT</Box>;
  }

  const { enabled, setEnabled } = ctx;

  return (
    <Box sx={styles.container()}>
      <Tooltip title="Toggle interactive tooltips for planets, houses, signs, and aspects">
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              sx={styles.switch()}
            />
          }
          label="Interactions"
          sx={styles.label()}
        />
      </Tooltip>
    </Box>
  );
}
