'use client';

import { Avatar, Menu, MenuItem, CircularProgress, Box, Link } from '@mui/material';
import type { ProfileViewProps } from './profile.types';
import { styles } from './profile.styles';

export function ProfileView({
  isLoading,
  isAuthenticated,
  userInitials,
  onSignOut,
  isMounted,
  config,
  routes,
  menuAnchorEl,
  onMenuOpen,
  onMenuClose,
  onNavigateToCharts,
}: ProfileViewProps) {
  // During SSR or initial mount, show a neutral state to prevent hydration mismatch
  if (!isMounted) {
    return (
      <Box sx={styles.root()}>
        <Link href={routes.LOGIN} underline="hover">
          {config.copy.menu.login}
        </Link>
        <Link href={routes.SIGNUP} underline="hover" sx={{ ml: 1.5 }}>
          {config.copy.menu.signup}
        </Link>
      </Box>
    );
  }

  // Show loading only briefly during initial fetch
  if (isLoading) {
    return (
      <Box sx={styles.root()}>
        <CircularProgress size={config.ui.avatar.size} />
      </Box>
    );
  }

  if (isAuthenticated) {
    return (
      <Box sx={styles.root()}>
        <Avatar
          sx={styles.avatar(config.ui.avatar.size)}
          onClick={onMenuOpen}
          aria-label="User menu"
          aria-controls={menuAnchorEl ? 'profile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={menuAnchorEl ? 'true' : undefined}
        >
          {userInitials}
        </Avatar>
        <Menu
          id="profile-menu"
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={onMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={styles.menu()}
        >
          <MenuItem onClick={onNavigateToCharts}>{config.copy.menu.myCharts}</MenuItem>
          <MenuItem onClick={onSignOut}>{config.copy.menu.signOut}</MenuItem>
        </Menu>
      </Box>
    );
  }

  return (
    <Box sx={styles.root()}>
      <Link href={routes.LOGIN} underline="hover">
        {config.copy.menu.login}
      </Link>
      <Link href={routes.SIGNUP} underline="hover" sx={{ ml: 1.5 }}>
        {config.copy.menu.signup}
      </Link>
    </Box>
  );
}
