import { Theme } from '@mui/material';

export const styles = {
  root: () => (theme: Theme) => ({
    p: 3,
  }),

  loadingContainer: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  }),
};
