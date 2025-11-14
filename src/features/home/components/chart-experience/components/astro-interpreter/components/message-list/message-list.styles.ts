import { Theme } from '@mui/material';

export const styles = {
  container: () => (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    mb: 1,
    pr: 0.5,
    '&::-webkit-scrollbar': {
      width: 6,
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(138, 43, 226, 0.35)',
      borderRadius: 4,
    },
  }),
  loadingContainer: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'flex-start',
  }),
};
