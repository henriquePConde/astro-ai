import { Theme } from '@mui/material';

export const styles = {
  container: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    gap: 2,
  }),
};
