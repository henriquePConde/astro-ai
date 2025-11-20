import type { Theme } from '@mui/material';

export const styles = {
  root: () => (theme: Theme) => ({
    position: 'absolute',
    bottom: theme.spacing(1.5),
    right: theme.spacing(1.5),
    padding: theme.spacing(1, 1.5),
    borderRadius: theme.spacing(1),
    backgroundColor: 'rgba(5, 8, 30, 0.78)',
    color: theme.palette.common.white,
    backdropFilter: 'blur(8px)',
    boxShadow: '0 0 18px rgba(0, 0, 0, 0.45)',
    maxWidth: '80%',
    zIndex: 2,
    ...(theme.typography.fontFamily && { fontFamily: theme.typography.fontFamily }),
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
  }),

  content: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.25),
  }),

  title: () => (theme: Theme) => ({
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.5,
    marginBottom: theme.spacing(0.25),
  }),

  bodyLine: () => (theme: Theme) => ({
    fontSize: 11,
    lineHeight: 1.4,
    display: 'block',
    width: '100%',
  }),

  closedButton: () => (theme: Theme) => ({
    position: 'absolute',
    bottom: theme.spacing(1.5),
    right: theme.spacing(1.5),
    width: 32,
    height: 32,
    borderRadius: '999px',
    backgroundColor: 'rgba(5, 8, 30, 0.9)',
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 18px rgba(0, 0, 0, 0.45)',
    cursor: 'pointer',
    zIndex: 2,
  }),
};
