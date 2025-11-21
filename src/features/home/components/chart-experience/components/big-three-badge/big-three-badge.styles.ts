import type { Theme } from '@mui/material';

export const styles = {
  root: () => (theme: Theme) => ({
    position: 'absolute',
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    padding: theme.spacing(1, 1.5),
    borderRadius: theme.spacing(1),
    backgroundColor: 'rgba(5, 8, 30, 0.78)',
    color: theme.palette.common.white,
    backdropFilter: 'blur(8px)',
    boxShadow: '0 0 18px rgba(0, 0, 0, 0.45)',
    maxWidth: '80%',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
    ...(theme.typography.fontFamily && { fontFamily: theme.typography.fontFamily }),
  }),

  signLine: () => (theme: Theme) => ({
    fontSize: 11,
    lineHeight: 1.4,
    opacity: 0.9,
  }),

  button: () => (theme: Theme) => ({
    marginTop: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    fontSize: 10,
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: theme.spacing(0.5),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: theme.palette.common.white,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
  }),
};
