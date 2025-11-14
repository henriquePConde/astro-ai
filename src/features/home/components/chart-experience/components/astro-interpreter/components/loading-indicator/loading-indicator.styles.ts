import { Theme } from '@mui/material';

export const styles = {
  container: () => (theme: Theme) => ({
    maxWidth: '80%',
    borderRadius: 2,
    p: 1.5,
    bgcolor: 'rgba(13,12,34,0.8)',
    border: '1px solid rgba(255,255,255,0.06)',
    backdropFilter: 'blur(10px)',
    '@keyframes bounce': {
      '0%, 80%, 100%': {
        transform: 'scale(0.8)',
        opacity: 0.4,
      },
      '40%': {
        transform: 'scale(1)',
        opacity: 1,
      },
    },
  }),
  dotsContainer: () => (theme: Theme) => ({
    display: 'flex',
    gap: 0.75,
  }),
  dot: (delay: string) => (theme: Theme) => ({
    width: 6,
    height: 6,
    borderRadius: '999px',
    bgcolor: 'rgba(255,255,255,0.5)',
    animation: 'bounce 1s infinite',
    animationDelay: delay,
  }),
};
