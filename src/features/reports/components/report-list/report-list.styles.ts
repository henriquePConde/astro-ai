import { Theme } from '@mui/material';

export const styles = {
  root: () => (theme: Theme) => ({
    p: 3,
  }),
  titleContainer: () => (theme: Theme) => ({
    textAlign: 'center',
    mb: 2,
  }),
  title: (fontSize: string, fontWeight: number) => (theme: Theme) => ({
    fontSize,
    fontWeight,
    background: 'linear-gradient(to right, #e2d4ff, #b388ff)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    textShadow: '0 4px 12px rgba(138,43,226,0.35)',
    fontFamily: 'var(--font-cinzel-decorative), serif',
    m: 0,
  }),
  loadingContainer: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  }),
  list: () => (theme: Theme) => ({
    bgcolor: 'transparent',
  }),
  listItem: () => (theme: Theme) => ({
    cursor: 'pointer',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 2,
    mb: 1,
    background: 'linear-gradient(135deg, rgba(13, 12, 34, 0.8), rgba(49, 35, 89, 0.85))',
    backdropFilter: 'blur(15px)',
  }),
};
