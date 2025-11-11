// src/shared/components/astro-chart/astro-wheel.styles.ts
import { Theme } from '@mui/material';

export const astroWheelStyles = {
  root: () => (theme: Theme) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 600,
    maxHeight: 600,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 360,
      maxHeight: 360,
    },
  }),
  svg: () => () => ({
    width: '100%',
    height: '100%',
    display: 'block',
  }),
};
