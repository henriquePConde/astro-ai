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
    zIndex: 1,
  }),
  intro: (isInteractive: boolean) => (theme: Theme) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: isInteractive ? 50 : 30, // Lower z-index when not interactive so form can be on top
    pointerEvents: isInteractive ? 'auto' : 'none',
  }),
  chartExperience: () => (theme: Theme) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 40,
    pointerEvents: 'auto',
  }),
};
