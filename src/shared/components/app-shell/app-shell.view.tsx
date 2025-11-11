'use client';

import { Box } from '@mui/material';
import { styles } from './app-shell.styles';
import type { AppShellViewProps } from './app-shell.types';

export function AppShellView({ header, background, intro, content, config }: AppShellViewProps) {
  return (
    <Box component={config.main.component} sx={styles.root()}>
      <Box sx={styles.background()}>{background}</Box>
      {header}
      {intro}
      {content}
    </Box>
  );
}
