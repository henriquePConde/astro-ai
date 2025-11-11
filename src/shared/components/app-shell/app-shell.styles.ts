import { Theme } from '@mui/material/styles';

export const styles = {
  root: () => (_theme: Theme) => ({
    position: 'relative',
    color: 'hsl(var(--foreground))',
    height: '100vh',
    overflow: 'hidden',
  }),
  background: () => (_theme: Theme) => ({
    position: 'fixed',
    inset: 0,
    zIndex: -1,
  }),
};
