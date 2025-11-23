'use client';

import { CircularProgress, Box } from '@mui/material';
import type { ProfileViewProps } from './profile.types';
import { styles } from './profile.styles';
import { ProfileAvatarMenu } from './components/profile-avatar-menu';

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
      <ProfileAvatarMenu
        userInitials={userInitials}
        config={config}
        menuAnchorEl={menuAnchorEl}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        onNavigateToCharts={onNavigateToCharts}
        onSignOut={onSignOut}
      />
    );
  }

  return null;
}
