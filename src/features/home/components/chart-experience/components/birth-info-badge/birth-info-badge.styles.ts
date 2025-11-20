import type { Theme } from '@mui/material';

export const styles = {
  root: () => (theme: Theme) => ({
    position: 'absolute',
    top: theme.spacing(1.5),
    left: theme.spacing(1.5),
    padding: theme.spacing(1, 1.5),
    borderRadius: theme.spacing(1),
    backgroundColor: 'rgba(5, 8, 30, 0.78)',
    color: theme.palette.common.white,
    backdropFilter: 'blur(8px)',
    boxShadow: '0 0 18px rgba(0, 0, 0, 0.45)',
    maxWidth: '80%',
    zIndex: 2,
    ...(theme.typography.fontFamily && { fontFamily: theme.typography.fontFamily }),
  }),

  name: () => (theme: Theme) => ({
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.5,
    marginBottom: theme.spacing(0.25),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),

  meta: () => (theme: Theme) => ({
    fontSize: 11,
    opacity: 0.85,
    lineHeight: 1.4,
  }),
};
