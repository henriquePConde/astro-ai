import { Theme } from '@mui/material';

export const styles = {
  root: (visible: boolean) => (theme: Theme) => ({
    position: 'absolute' as const,
    // Offset for app header (~89px) so the carousel is centered in the
    // visible area below the navigation.
    top: '89px',
    left: 0,
    width: '100%',
    height: 'calc(100vh - 89px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3, 2),
    transition: 'all 1000ms',
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? ('auto' as const) : ('none' as const),
    // Slight scale gives an inset look (~10% smaller feel when visible)
    transform: visible ? 'scale(0.9)' : 'scale(0.85)',
    zIndex: 50,
  }),
  container: () => (theme: Theme) => ({
    position: 'relative' as const,
    maxWidth: '72rem', // ~10% narrower than before
    width: '100%',
    height: '495px', // ~10% shorter than previous 550px
  }),
  carousel: () => (theme: Theme) => ({
    position: 'relative' as const,
    borderRadius: '8px',
    overflow: 'hidden',
    height: '100%',
    padding: theme.spacing(4),
    background: 'linear-gradient(135deg, rgba(13, 12, 34, 0.8), rgba(49, 35, 89, 0.85))',
    backdropFilter: 'blur(15px)',
  }),
  overlay: () => (theme: Theme) => ({
    position: 'absolute' as const,
    inset: 0,
    backdropFilter: 'blur(20px)',
    background:
      'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1))',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 0 50px -12px rgba(138, 43, 226, 0.15)',
  }),
  content: () => (theme: Theme) => ({
    position: 'relative' as const,
    padding: theme.spacing(1.5),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }),
  slidesContainer: () => (theme: Theme) => ({
    position: 'relative' as const,
    flex: 1,
  }),
  skipButton: () => (theme: Theme) => ({
    position: 'absolute' as const,
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    padding: theme.spacing(1, 2),
    color: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'all 300ms',
    backdropFilter: 'blur(4px)',
    zIndex: 10,
    '&:hover': {
      color: 'white',
      borderColor: 'rgba(255, 255, 255, 0.4)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  }),
};
