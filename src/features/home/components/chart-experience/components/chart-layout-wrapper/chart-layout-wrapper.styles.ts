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
    px: { xs: 0, md: 6 },
    transition: 'opacity 1000ms',
    overflow: 'hidden',
    opacity: sectionVisible ? 1 : 0,
    pointerEvents: sectionVisible ? 'auto' : 'none',
  }),

  container: (isDragging: boolean, hasChartData: boolean) => (theme: Theme) => ({
    width: '100%',
    transition: isDragging ? 'none' : 'all 300ms',
    ...(hasChartData
      ? {
          position: 'fixed',
          // Header height: 80px on mobile, ~89px on larger screens
          top: {
            xs: '80px',
            md: '89px',
          },
          left: 0,
          right: 0,
          height: {
            xs: 'calc(100vh - 80px)',
            md: 'calc(100vh - 89px)',
          },
          zIndex: 50,
          bgcolor: 'rgba(13, 12, 34, 0.98)',
        }
      : {
          // Birth data form mode (no chart yet):
          // center the form within the viewport below the header and
          // let it use more horizontal space on smaller screens.
          minHeight: {
            xs: 'calc(100vh - 80px)',
            md: 'calc(100vh - 89px)',
          },
          mt: {
            xs: '80px',
            md: '89px',
          },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: {
            xs: '100%', // full width on phones
            sm: '100%', // also full width on small tablets
            md: '90%',
          },
          mx: 'auto',
          px: { xs: 0.5, md: 4 },
          [`@media (min-width: 1536px)`]: {
            maxWidth: '80%',
          },
        }),
  }),
};
