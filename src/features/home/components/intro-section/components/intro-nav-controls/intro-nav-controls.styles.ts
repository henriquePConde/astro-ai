import { Theme } from '@mui/material';

export const styles = {
  button: () => (theme: Theme) => ({
    position: 'absolute' as const,
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    transition: 'all 300ms',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(4px)',
    borderRadius: '50%',
    width: 40,
    height: 40,
    minWidth: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  }),
  prevButton: () => (theme: Theme) => ({
    left: theme.spacing(1.5),
  }),
  nextButton: () => (theme: Theme) => ({
    right: theme.spacing(1.5),
  }),
};
