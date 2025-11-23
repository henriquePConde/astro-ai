'use client';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * Shared responsive hook that returns true when the viewport is considered "desktop".
 *
 * We treat desktop as MUI `lg` and above, which keeps tablets and phones
 * in the non-desktop bucket for tailored UX (e.g. skipping scroll prompts).
 */
export function useIsDesktop(): boolean {
  const theme = useTheme();

  // Use `noSsr: true` to avoid hydration mismatches between server and client.
  return useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true });
}
