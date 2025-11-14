import { Theme } from '@mui/material';

export const styles = {
  container: () => (theme: Theme) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  }),
  title: () => (theme: Theme) => ({
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  }),
  message: () => (theme: Theme) => ({
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }),
  error: () => (theme: Theme) => ({
    color: theme.palette.error.main,
    marginTop: theme.spacing(2),
  }),
} as const;
