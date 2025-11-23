import type { Theme } from '@mui/material/styles';

export const styles = {
  root: () => (theme: Theme) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // Match the dark purple overlay used in charts experience overlays
    bgcolor: 'rgba(13, 12, 34, 0.98)',
    textAlign: 'center',
    px: 2,
  }),
  content: (maxWidth: number) => (_theme: Theme) => ({
    maxWidth,
  }),
};
