import type { Theme } from '@mui/material';

export const styles = {
  wrapper: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    position: 'relative',
  }),

  // Header row: interactions switch (left) + control buttons (right)
  header: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: {
      xs: 'flex-end', // on mobile/tablet, only control buttons are visible → align them right
      lg: 'space-between', // on desktop, keep switcher on the left and buttons on the right
    },
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    zIndex: 2,
  }),

  // Main split layout (chart + data panel)
  container: (isExpanded: boolean, isDragging: boolean) => (theme: Theme) => ({
    display: 'flex',
    flexDirection: {
      xs: 'column',
      lg: 'row',
    },
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    position: 'relative',
    flex: 1,
    transition: isDragging ? 'none' : 'all 0.25s ease',
    height: isExpanded ? 'calc(100vh - 96px)' : 'calc(100vh - 220px)',
    maxHeight: '100%',
    overflow: 'hidden',
  }),
};
