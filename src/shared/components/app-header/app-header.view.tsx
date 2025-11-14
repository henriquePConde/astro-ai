'use client';

import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styles } from './app-header.styles';
import type { AppHeaderViewProps } from './app-header.types';

export function AppHeaderView({ headerContent, config }: AppHeaderViewProps) {
  return (
    <AppBar position="absolute" elevation={0} sx={styles.root()}>
      <Toolbar disableGutters sx={styles.toolbar()}>
        <Typography
          variant={config.typography.variant}
          component="div"
          fontWeight={config.typography.fontWeight}
        >
          {config.copy.appName}
        </Typography>
        <Box sx={styles.headerContent()}>{headerContent}</Box>
      </Toolbar>
    </AppBar>
  );
}
