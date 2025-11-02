import { Theme } from '@mui/material/styles';

export const styles = {
  root: () => (theme: Theme) => ({
    padding: theme.spacing(1.5, 2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
  }),
};
