import { Theme } from '@mui/material';

export const styles = {
  root: () => (theme: Theme) => ({
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    color: 'white',
  }),
  header: () => (theme: Theme) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  }),
  canvas: () => (theme: Theme) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  }),
  intro: () => (theme: Theme) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 50,
    pointerEvents: 'auto',
  }),
};
