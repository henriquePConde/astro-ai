'use client';

import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styles } from './app-header.styles';

interface AppHeaderViewProps {
  headerContent: React.ReactNode;
}

export function AppHeaderView({ headerContent }: AppHeaderViewProps) {
  return (
    <AppBar position="static" elevation={0} sx={styles.root()}>
      <Toolbar disableGutters sx={{ width: '100%', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" fontWeight={600}>
          Astro AI
        </Typography>
        <Box>{headerContent}</Box>
      </Toolbar>
    </AppBar>
  );
}
