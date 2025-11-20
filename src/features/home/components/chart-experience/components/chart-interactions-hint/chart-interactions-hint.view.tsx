'use client';

import { Box, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { styles } from './chart-interactions-hint.styles';
import type { ChartInteractionsHintViewProps } from './chart-interactions-hint.types';

export function ChartInteractionsHintView({
  isOpen,
  interactionsEnabled,
  onToggle,
  config,
}: ChartInteractionsHintViewProps) {
  const theme = useTheme();

  if (!interactionsEnabled && !isOpen) {
    // When interactions are off and tooltip is closed, render nothing.
    return null;
  }

  if (!isOpen) {
    return (
      <Tooltip title={config.copy.tooltipClosed}>
        <Box sx={styles.closedButton()(theme)} onClick={onToggle}>
          <HelpOutlineIcon fontSize="small" />
        </Box>
      </Tooltip>
    );
  }

  return (
    <Box sx={styles.root()(theme)}>
      <Box sx={styles.content()(theme)}>
        <Typography component="div" sx={styles.title()(theme)}>
          {config.copy.title}
        </Typography>
        {config.copy.descriptionLines.map((line) => (
          <Typography key={line} component="div" sx={styles.bodyLine()(theme)}>
            {line}
          </Typography>
        ))}
      </Box>
      <IconButton
        size="small"
        onClick={onToggle}
        sx={{ color: 'inherit', padding: 0.25, marginLeft: theme.spacing(0.5) }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
