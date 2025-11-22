import type { Theme } from '@mui/material';

export const styles = {
  root: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
  }),

  newChartButton: () => (theme: Theme) => ({
    borderRadius: 999,
    paddingInline: theme.spacing(2.5),
    minWidth: 140,
    textTransform: 'none',
    fontWeight: 500,
    boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
  }),

  iconButton: () => (theme: Theme) => ({
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.14)',
    backdropFilter: 'blur(10px)',
  }),
};
