import { Theme } from '@mui/material';

export const styles = {
  container: (isExpanded: boolean, isDragging: boolean, splitPosition: number) => (theme: Theme) => ({
    height: '100%',
    bgcolor: 'rgba(13, 12, 34, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: 4,
    p: 3,
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 0 30px -12px rgba(138, 43, 226, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    width: isExpanded ? `${100 - splitPosition}%` : { xs: '100%', lg: '50%' },
    transition: isDragging ? 'none' : 'all 300ms',
  }),
  content: () => (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    pr: 1,
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(138, 43, 226, 0.3)',
      borderRadius: 4,
      '&:hover': {
        background: 'rgba(138, 43, 226, 0.5)',
      },
    },
  }),
  placeholder: () => (theme: Theme) => ({
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    pt: 4,
  }),
};

