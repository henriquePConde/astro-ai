'use client';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * Shared responsive hook that returns true when the viewport is considered "desktop".
 *
 * We treat desktop as MUI `md` and above so tablets share the desktop
 * experience, while only phones use the simplified mobile UX.
 */
export function useIsDesktop(): boolean {
  const theme = useTheme();

  // Use `noSsr: true` to avoid hydration mismatches between server and client.
  return useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });
}
