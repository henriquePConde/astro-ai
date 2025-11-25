import { Theme } from '@mui/material';

export const styles = {
  form: () => (theme: Theme) => ({
    mt: 'auto',
    // Fixed positioning for mobile and tablet
    [theme.breakpoints.down('lg')]: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(5, 8, 30, 0.95)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: theme.spacing(2),
      margin: 0,
    },
  }),
  formContainer: () => (theme: Theme) => ({
    display: 'flex',
    gap: 1.5,
    // Ensure proper spacing on mobile
    [theme.breakpoints.down('lg')]: {
      maxWidth: '100%',
    },
  }),
  textFieldInput: () => (theme: Theme) => ({
    bgcolor: 'rgba(13,12,34,0.8)',
    borderRadius: 2,
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'mystical, serif',
    fontSize: 18,
    px: 1.5,
    '&::placeholder': {
      color: 'rgba(255,255,255,0.5)',
    },
  }),
  textField: () => (theme: Theme) => ({
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255,255,255,0.12)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(138,43,226,0.6)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(138,43,226,0.8)',
    },
  }),
  button: (disabled: boolean) => (theme: Theme) => ({
    px: 3,
    borderRadius: 2,
    fontFamily: 'mystical, serif',
    textTransform: 'none',
    bgcolor: disabled ? 'rgba(138,43,226,0.15)' : 'rgba(138,43,226,0.4)',
    color: disabled ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.95)',
    border: '1px solid rgba(255,255,255,0.16)',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.25s',
    '&:hover': !disabled
      ? {
          bgcolor: 'rgba(138,43,226,0.7)',
          boxShadow: '0 0 18px rgba(138,43,226,0.45)',
        }
      : {},
  }),
};
