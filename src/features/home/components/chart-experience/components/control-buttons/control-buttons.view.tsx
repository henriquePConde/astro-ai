'use client';

import { Box, Button, CircularProgress, Tooltip, useTheme } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import { styles } from './control-buttons.styles';
import type { ControlButtonsProps } from './control-buttons.types';
import { useTimeUntilReset } from '@/shared/hooks/use-time-until-reset';

export function ControlButtonsView({ onNewChart, loading, config, usage }: ControlButtonsProps) {
  const theme = useTheme();
  const isChartLimitReached = usage ? usage.charts.used >= usage.charts.limit : false;
  const timeRemaining = useTimeUntilReset(usage?.charts.firstGenerationAt);

  const handleClick = () => {
    if (!onNewChart || isChartLimitReached || loading) return;
    onNewChart();
  };

  const button = (
    <Button
      variant={config.ui.button.variant}
      onClick={handleClick}
      startIcon={!loading && <RefreshIcon />}
      disabled={isChartLimitReached || loading}
      sx={styles.newChartButton()(theme)}
    >
      {loading ? <CircularProgress size={18} color="inherit" /> : config.copy.newChart}
    </Button>
  );

  return (
    <Box sx={styles.root()(theme)}>
      {isChartLimitReached ? (
        <Tooltip
          title={config.copy.tooltipLimitReached(timeRemaining)}
          slotProps={{
            tooltip: {
              sx: {
                fontSize: '0.95rem',
              },
            },
          }}
        >
          <span>{button}</span>
        </Tooltip>
      ) : (
        button
      )}

      {/*
        Collapse/expand button intentionally hidden for now.
        Keeping props so we can re-enable without API changes.
      */}
    </Box>
  );
}
