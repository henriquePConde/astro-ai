import { Theme } from '@mui/material/styles';

export const styles = {
  root: () => (theme: Theme) => ({
    maxWidth: 480,
    margin: '72px auto',
    padding: theme.spacing(3),
  }),
  form: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
  }),
  message: () => (theme: Theme) => ({
    marginTop: theme.spacing(2),
  }),
};
