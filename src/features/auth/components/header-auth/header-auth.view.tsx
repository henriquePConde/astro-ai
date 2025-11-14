'use client';

import { Button, Link, Typography, Box, CircularProgress } from '@mui/material';
import type { HeaderAuthViewProps } from './header-auth.types';
import { styles } from './header-auth.styles';

export function HeaderAuthView({
  isLoading,
  isAuthenticated,
  email,
  onSignOut,
  isMounted,
  config,
  routes,
}: HeaderAuthViewProps) {
  // During SSR or initial mount, show a neutral state to prevent hydration mismatch
  if (!isMounted) {
    return (
      <Box sx={styles.links()}>
        <Link href={routes.LOGIN} underline={config.ui.links.underline}>
          {config.copy.links.login}
        </Link>
        <Link href={routes.SIGNUP} underline={config.ui.links.underline}>
          {config.copy.links.signup}
        </Link>
      </Box>
    );
  }

  // Show loading only briefly during initial fetch
  if (isLoading) {
    return (
      <Box sx={styles.root()}>
        <CircularProgress size={config.ui.loading.size} />
      </Box>
    );
  }

  if (isAuthenticated) {
    return (
      <Box sx={styles.root()}>
        <Typography variant={config.ui.email.variant} sx={styles.email()}>
          {email}
        </Typography>
        <Button variant={config.ui.button.variant} size={config.ui.button.size} onClick={onSignOut}>
          {config.copy.button.signOut}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={styles.links()}>
      <Link href={routes.LOGIN} underline={config.ui.links.underline}>
        {config.copy.links.login}
      </Link>
      <Link href={routes.SIGNUP} underline={config.ui.links.underline}>
        {config.copy.links.signup}
      </Link>
    </Box>
  );
}
