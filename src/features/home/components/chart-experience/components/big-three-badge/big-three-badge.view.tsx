'use client';

import { Box, Typography, Button, useTheme } from '@mui/material';
import { styles } from './big-three-badge.styles';
import type { BigThreeBadgeViewProps } from './big-three-badge.types';

export function BigThreeBadgeView({
  sunSign,
  moonSign,
  ascendantSign,
  onAskAI,
  config,
}: BigThreeBadgeViewProps) {
  const theme = useTheme();

  if (!sunSign || !moonSign || !ascendantSign) return null;

  return (
    <Box sx={styles.root()(theme)}>
      <Typography component="div" sx={styles.signLine()(theme)}>
        {config.copy.sun} {sunSign}
      </Typography>
      <Typography component="div" sx={styles.signLine()(theme)}>
        {config.copy.moon} {moonSign}
      </Typography>
      <Typography component="div" sx={styles.signLine()(theme)}>
        {config.copy.ascendant} {ascendantSign}
      </Typography>
      <Button onClick={onAskAI} variant="text" sx={styles.button()(theme)}>
        {config.copy.button}
      </Button>
    </Box>
  );
}
