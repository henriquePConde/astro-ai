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

  actions: () => () => ({
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  }),

  generateButton: (enabled: boolean) => (theme: Theme) => ({
    px: 3,
    py: 1.25,
    borderRadius: 999,
    border: 'none',
    cursor: enabled ? 'pointer' : 'default',
    fontWeight: 600,
    fontSize: 13,
    textTransform: 'uppercase',
    color: '#ffffff',
    background: 'linear-gradient(90deg, #8B5CF6 0%, #EC4899 50%, #6366F1 100%)',
    opacity: enabled ? 1 : 0.5,
    boxShadow: enabled ? '0 0 24px rgba(79,70,229,0.6)' : '0 0 12px rgba(15,23,42,1)',
    transition: 'all 0.2s ease',
    '&:hover': enabled
      ? {
          boxShadow: '0 0 32px rgba(79,70,229,0.8)',
          transform: 'translateY(-1px)',
        }
      : undefined,
  }),

  error: () => (theme: Theme) => ({
    color: theme.palette.error.light,
    fontSize: 12,
  }),
};
