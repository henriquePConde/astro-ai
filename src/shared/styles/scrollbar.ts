import type { SxProps, Theme } from '@mui/material';

export const scrollbarSx = (_theme: Theme): SxProps<Theme> => ({
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(138, 43, 226, 0.35) rgba(255, 255, 255, 0.02)',
  '&::-webkit-scrollbar': {
    width: 6,
    height: 6,
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 4,
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(138, 43, 226, 0.35)',
    borderRadius: 4,
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(138, 43, 226, 0.5)',
  },
});
