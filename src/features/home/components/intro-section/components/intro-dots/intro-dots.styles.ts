import { Theme } from '@mui/material';

export const styles = {
  root: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  }),
  dot: (isActive: boolean) => (theme: Theme) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    transition: 'all 300ms',
    backgroundColor: isActive ? 'white' : 'rgba(255, 255, 255, 0.3)',
    transform: isActive ? 'scale(1.25)' : 'scale(1)',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    minWidth: 8,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
  }),
};
