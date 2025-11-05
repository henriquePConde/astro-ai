import { Theme } from '@mui/material/styles';

export const primitives = {
  card: () => (theme: Theme) => ({
    bgcolor: 'hsl(var(--card))',
    color: 'hsl(var(--foreground))',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'hsl(var(--border))',
    boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
  }),
  panelHeader: () => (theme: Theme) => ({
    color: 'hsl(var(--muted-foreground))',
    fontWeight: 600,
    letterSpacing: '0.02em',
  }),
  mutedText: () => (_: Theme) => ({
    color: 'hsl(var(--muted-foreground))',
  }),
  gradientCta: () => (_: Theme) => ({
    background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
    color: '#fff',
    boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 44px rgba(0,0,0,0.45)',
    },
  }),
  pageBg: () => (_: Theme) => ({
    minHeight: '100vh',
    bgcolor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
  }),
};


