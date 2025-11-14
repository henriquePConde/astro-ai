import type { Theme } from '@mui/material';

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
      width: { lg: `${100 - splitPosition}%` },
      overflow: 'hidden',
    }),

  content: () => (theme: Theme) => ({
    flex: 1,
    mt: 1,
    overflowY: 'auto',
    pr: 1,
    pb: 2,
    '&::-webkit-scrollbar': {
      width: 6,
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255,255,255,0.18)',
      borderRadius: 999,
    },
  }),

  tabPanel: (isActive: boolean) => (theme: Theme) => ({
    display: isActive ? 'block' : 'none',
    height: '100%',
  }),
};
