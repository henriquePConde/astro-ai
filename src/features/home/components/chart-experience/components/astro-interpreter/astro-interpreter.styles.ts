import { Theme } from '@mui/material';

export const styles = {
  container: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    gap: 2,
    // Add bottom padding on mobile/tablet to account for fixed input
    [theme.breakpoints.down('lg')]: {
      paddingBottom: theme.spacing(10), // Space for fixed input form
    },
  }),
};
