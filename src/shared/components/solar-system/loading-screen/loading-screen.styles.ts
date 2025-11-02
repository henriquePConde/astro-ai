import { Theme } from '@mui/material';

export const styles = {
  root: (opacity: number) => (theme: Theme) => ({
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    transition: 'opacity 700ms',
    opacity,
    pointerEvents: opacity === 0 ? ('none' as const) : ('auto' as const),
    background: `linear-gradient(to bottom, 
      #020518 0%, 
      #030720 70%, 
      #040830 100%
    )`,
  }),
  text: () => (theme: Theme) => ({
    color: 'white',
    fontSize: '1.25rem',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: theme.spacing(1, 3),
    borderRadius: '9999px',
    '@keyframes pulse': {
      '0%, 100%': {
        opacity: 1,
      },
      '50%': {
        opacity: 0.5,
      },
    },
  }),
};
