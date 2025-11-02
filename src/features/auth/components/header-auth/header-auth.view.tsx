'use client';

import { useState, useEffect } from 'react';
import { Button, Link, Typography, Box, CircularProgress } from '@mui/material';
import type { HeaderAuthViewProps } from './header-auth.types';
import { styles } from './header-auth.styles';

export function HeaderAuthView({
  isLoading,
  isAuthenticated,
  email,
  onSignOut,
}: HeaderAuthViewProps) {
  // Use client-side only rendering to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // During SSR or initial mount, show a neutral state to prevent hydration mismatch
  if (!isMounted) {
    return (
      <Box sx={styles.links()}>
        <Link href="/login" underline="hover">
          Log in
        </Link>
        <Link href="/signup" underline="hover">
          Sign up
        </Link>
      </Box>
    );
  }

  // Show loading only briefly during initial fetch
  if (isLoading) {
    return (
      <Box sx={styles.root()}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  if (isAuthenticated) {
    return (
      <Box sx={styles.root()}>
        <Typography variant="body2" sx={styles.email()}>
          {email}
        </Typography>
        <Button variant="outlined" size="small" onClick={onSignOut}>
          Sign out
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={styles.links()}>
      <Link href="/login" underline="hover">
        Log in
      </Link>
      <Link href="/signup" underline="hover">
        Sign up
      </Link>
    </Box>
  );
}
