import { useState, useCallback } from 'react';

/**
 * UI state hook for profile menu.
 * Component-level hook for local UI state only (no I/O).
 */
export function useProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    anchorEl,
    isOpen,
    handleOpen,
    handleClose,
  };
}
