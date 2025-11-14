const BACKGROUND_COLOR = '#030720';

export const styles = {
  root: () => ({
    width: '100%',
    height: '100vh',
  }),
  canvas: () => ({
    background: BACKGROUND_COLOR,
  }),
  backgroundColor: () => BACKGROUND_COLOR,
} as const;
