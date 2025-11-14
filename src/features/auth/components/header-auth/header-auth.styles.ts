import { Theme } from '@mui/material/styles';

export const styles = {
  root: () => (theme: Theme) => ({
    display: 'flex',
    gap: theme.spacing(1.5),
    alignItems: 'center',
  }),
  email: () => (theme: Theme) => ({
    opacity: 0.8,
    color: theme.palette.text.secondary,
  }),
  links: () => (theme: Theme) => ({
    display: 'flex',
    gap: theme.spacing(1.25),
  }),
};
