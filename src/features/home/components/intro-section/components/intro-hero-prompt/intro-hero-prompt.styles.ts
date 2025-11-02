import { Theme } from '@mui/material';

export const styles = {
  root: (visible: boolean) => (theme: Theme) => ({
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: theme.spacing(3),
    transition: 'opacity 1000ms ease-in-out',
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? ('auto' as const) : ('none' as const),
    zIndex: 50,
  }),
  content: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
  }),
  text: () => (theme: Theme) => ({
    color: 'white',
    fontSize: '1.5rem',
    fontFamily: theme.typography.fontFamily,
    letterSpacing: '0.05em',
    opacity: 0.9,
    textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)',
    margin: 0,
  }),
  arrow: () => (theme: Theme) => ({
    color: 'white',
    fontSize: '2.5rem',
    lineHeight: 1,
    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
    animation: 'bounce 2s infinite',
    '@keyframes bounce': {
      '0%, 100%': {
        transform: 'translateY(0)',
      },
      '50%': {
        transform: 'translateY(-10px)',
      },
    },
  }),
};
