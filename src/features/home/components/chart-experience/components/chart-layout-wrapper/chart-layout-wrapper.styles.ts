import { Theme } from '@mui/material';

export const styles = {
  wrapper: (sectionVisible: boolean) => (theme: Theme) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    px: 6,
    transition: 'opacity 1000ms',
    overflow: 'hidden',
    opacity: sectionVisible ? 1 : 0,
    pointerEvents: sectionVisible ? 'auto' : 'none',
  }),
  container: (isDragging: boolean, hasChartData: boolean) => (theme: Theme) => ({
    width: '100%',
    height: '100%',
    transition: isDragging ? 'none' : 'all 300ms',
    ...(hasChartData
      ? {
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          bgcolor: 'rgba(13, 12, 34, 0.98)',
        }
      : {
          maxWidth: '90%',
          mx: 'auto',
          px: { xs: 2, md: 4 },
          [`@media (min-width: 1536px)`]: {
            maxWidth: '80%',
          },
        }),
  }),
};

