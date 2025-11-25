import type { Theme } from '@mui/material';
import { scrollbarSx } from '@/shared/styles/scrollbar';

export const styles = {
  container:
    (isExpanded: boolean, isDragging: boolean, splitPosition: number) => (theme: Theme) => ({
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      pl: 2,
      pr: 2,
      transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      width: {
        xs: '100%',
        lg: `${100 - splitPosition}%`,
      },
      overflow: 'hidden',
    }),

  content: () => (theme: Theme) => {
    // `scrollbarSx` is typed as `SxProps`, which can technically include
    // `null` and other shapes. In practice, our helper always returns a
    // plain style object, so we cast to `any` for ergonomic access.
    const baseScrollbar = scrollbarSx(theme) as any;

    return {
      flex: 1,
      mt: 1,
      overflowY: 'auto',
      pr: 1,
      pb: 2,
      // Use the shared scrollbar styling for consistent color and look & feel
      ...baseScrollbar,
      // On mobile/tablet layout, make the scrollbar thicker and add extra right
      // padding to create a more comfortable scroll "gutter" without changing
      // the global scrollbar colors.
      [theme.breakpoints.down('lg')]: {
        '&::-webkit-scrollbar': {
          // Re-use the base scrollbar styles (when present) and then override
          // the width to create a slightly thicker scrollbar on smaller screens.
          ...(baseScrollbar?.['&::-webkit-scrollbar'] ?? {}),
          width: theme.spacing(1.5),
        },
      },
    };
  },

  tabPanel: (isActive: boolean) => (theme: Theme) => ({
    display: isActive ? 'block' : 'none',
    height: '100%',
  }),
};
