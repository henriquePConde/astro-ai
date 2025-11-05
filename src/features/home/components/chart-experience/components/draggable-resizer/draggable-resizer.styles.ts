import { Theme } from '@mui/material';

export const styles = {
  container: (splitPosition: number, isDragging: boolean) => (theme: Theme) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 32,
    cursor: 'col-resize',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: isDragging ? 'none' : 'all 300ms',
    left: `calc(${splitPosition}% - 1rem)`,
  }),
  handle: () => (theme: Theme) => ({
    width: 4,
    height: 96,
    bgcolor: 'rgba(138, 43, 226, 0.3)',
    borderRadius: '999px',
    '&:hover': {
      bgcolor: 'rgba(138, 43, 226, 0.5)',
      height: 128,
    },
    transition: 'all 200ms',
  }),
};

