import { Theme } from '@mui/material';

export const styles = {
  container: () => (theme: Theme) => ({
    textAlign: 'center',
    fontSize: '1.25rem',
    fontFamily: 'mystical, serif',
  }),
  error: () => (theme: Theme) => ({
    color: '#f87171', // red-400 equivalent
    fontFamily: 'mystical, serif',
  }),
};
