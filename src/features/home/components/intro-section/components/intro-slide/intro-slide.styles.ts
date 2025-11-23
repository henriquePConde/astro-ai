import { Theme } from '@mui/material';

export const styles = {
  root: (isActive: boolean) => (theme: Theme) => ({
    transition: 'all 700ms',
    height: '100%',
    opacity: isActive ? 1 : 0,
    transform: isActive ? 'translateY(0)' : 'translateY(32px)',
    pointerEvents: isActive ? ('auto' as const) : ('none' as const),
    position: isActive ? ('relative' as const) : ('absolute' as const),
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  }),
  content: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    gap: theme.spacing(2),
    alignItems: 'stretch',
    height: '100%',
    flex: 1,
    minHeight: 0,
  }),
  imageContainer: () => (theme: Theme) => ({
    width: {
      xs: '100%',
      md: '40%',
    },
    display: 'flex',
    alignItems: 'center',
    marginTop: {
      xs: '2rem',
      md: 0,
    },
  }),
  imageWrapper: () => (theme: Theme) => ({
    width: '100%',
    height: {
      xs: 220,
      sm: 260,
      md: 400,
    },
    minHeight: {
      xs: 200,
      md: 300,
    },
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  }),
  textContainer: () => (theme: Theme) => ({
    width: {
      xs: '100%',
      md: '60%',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: {
      xs: 'flex-start',
      md: 'center',
    },
    gap: theme.spacing(1),
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
  }),
  title: () => (theme: Theme) => ({
    fontSize: { xs: '1.5rem', md: '1.875rem' },
    fontWeight: 700,
    lineHeight: 1.2,
    background: 'linear-gradient(to right, white, #e3f2fd, white)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))',
  }),
  contentText: () => (theme: Theme) => ({
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1rem',
    lineHeight: 1.6,
    letterSpacing: '0.025em',
    filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))',
  }),
};
