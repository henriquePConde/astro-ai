'use client';

import type React from 'react';
import { Avatar, Menu, MenuItem, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import type { PROFILE_CONFIG } from '../profile.config';
import { styles } from '../profile.styles';

interface ProfileAvatarMenuProps {
  userInitials: string;
  config: typeof PROFILE_CONFIG;
  menuAnchorEl: HTMLElement | null;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuClose: () => void;
  onNavigateToCharts: () => void;
  onSignOut: () => void;
}

export function ProfileAvatarMenu({
  userInitials,
  config,
  menuAnchorEl,
  onMenuOpen,
  onMenuClose,
  onNavigateToCharts,
  onSignOut,
}: ProfileAvatarMenuProps) {
  const isMenuOpen = Boolean(menuAnchorEl);

  const handleToggleMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (isMenuOpen) {
      onMenuClose();
    } else {
      onMenuOpen(event);
    }
  };

  return (
    <Box sx={styles.root()}>
      <Box sx={styles.avatarWrapper()}>
        <Avatar
          sx={styles.avatar(config.ui.avatar.size)}
          onClick={onMenuOpen}
          aria-label="User menu"
          aria-controls={menuAnchorEl ? 'profile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isMenuOpen ? 'true' : undefined}
        >
          {userInitials}
        </Avatar>
        <Box sx={styles.menuIndicator()} onClick={handleToggleMenu}>
          {isMenuOpen ? (
            <KeyboardArrowUpIcon sx={styles.menuIndicatorIcon()} />
          ) : (
            <KeyboardArrowDownIcon sx={styles.menuIndicatorIcon()} />
          )}
        </Box>
      </Box>
      <Menu
        id="profile-menu"
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={onMenuClose}
        slotProps={{
          // Ensure the overlay covering the page while the menu is open still shows
          // a pointer cursor so hovering over the avatar/arrow feels interactive.
          backdrop: {
            sx: { cursor: 'pointer' },
          },
        }}
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
