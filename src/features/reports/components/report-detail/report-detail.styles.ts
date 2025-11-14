import { Theme } from '@mui/material';

export const styles = {
  root: () => (theme: Theme) => ({
    p: 3,
  }),
  headerContainer: () => (theme: Theme) => ({
    textAlign: 'center',
    mb: 1,
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
  subtitle: (fontSize: string) => (theme: Theme) => ({
    fontSize,
    color: '#b8a8e0',
    mt: '4px',
  }),
  loadingContainer: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  }),
  reportCard: () => (theme: Theme) => ({
    position: 'relative',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, rgb(13, 12, 34), rgb(49, 35, 89))',
    backdropFilter: 'blur(15px)',
    p: 2,
  }),
  reportCardOverlay: () => (theme: Theme) => ({
    position: 'absolute',
    inset: 0,
    backdropFilter: 'blur(20px)',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2), rgba(0,0,0,0.1))',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 0 50px -12px rgba(138, 43, 226, 0.15)',
  }),
  reportContent: () => (theme: Theme) => ({
    position: 'relative',
  }),
  actionsContainer: () => (theme: Theme) => ({
    mt: 3,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  }),
};
