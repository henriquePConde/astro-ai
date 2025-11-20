import type { Theme } from '@mui/material';

export const styles = {
  container: (maxWidth: number) => (theme: Theme) => ({
    maxWidth,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  }),
  root: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: '100%',
  }),

  header: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
  }),

  title: () => (theme: Theme) => ({
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.9)',
  }),

  subtitle: () => (theme: Theme) => ({
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  }),

  actions: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  }),

  error: () => (theme: Theme) => ({
    color: theme.palette.error.light,
    fontSize: 12,
  }),

  downloadButton: () => (theme: Theme) => ({
    position: 'relative',
  }),

  downloadContentWrapper: () => (theme: Theme) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  downloadSpinnerOverlay: () => (theme: Theme) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  }),

  generateButton: () => (theme: Theme) => ({
    position: 'relative',
  }),

  generateContentWrapper: () => (theme: Theme) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  generateSpinnerOverlay: () => (theme: Theme) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  }),
};
