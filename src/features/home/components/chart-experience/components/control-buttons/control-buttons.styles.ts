import { Theme } from '@mui/material';

export const styles = {
  container: () => (theme: Theme) => ({
    position: 'fixed',
    // Header is 152px high; place controls just below it with a small margin
    top: 168, // 152 + 16
    right: 64,
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    // Make sure it's above the chart overlay and typical headers
    zIndex: 2000,
  }),
  button: () => (theme: Theme) => ({
    px: 2,
    py: 0.75,
    fontSize: '0.875rem',
    bgcolor: 'rgba(138, 43, 226, 0.3)',
    '&:hover': {
      bgcolor: 'rgba(138, 43, 226, 0.5)',
      transform: 'scale(1.05)',
      boxShadow: '0 0 20px rgba(138, 43, 226, 0.3)',
    },
    backdropFilter: 'blur(4px)',
    borderRadius: 2,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'mystical, serif',
    transition: 'all 300ms',
    textTransform: 'none',
  }),
};
