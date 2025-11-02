import { Theme } from '@mui/material/styles';

export const styles = {
  container: () => (theme: Theme) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${theme.cosmic.colors.deepSpace} 0%, ${theme.cosmic.colors.spaceCard} 100%)`,
    position: 'relative',
    padding: theme.spacing(3),
  }),
  root: () => (theme: Theme) => ({
    maxWidth: 480,
    width: '100%',
    padding: theme.spacing(4),
    background: `linear-gradient(135deg, ${theme.cosmic.colors.gradientStart}, ${theme.cosmic.colors.gradientEnd})`,
    backdropFilter: theme.cosmic.effects.backdropBlur,
    borderRadius: theme.cosmic.effects.borderRadius,
    border: `1px solid ${theme.cosmic.colors.glassBorder}`,
    boxShadow: `0 8px 32px 0 ${theme.cosmic.colors.purpleGlow}`,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: theme.cosmic.colors.overlayGradient,
      zIndex: 0,
    },
    '& > *': {
      position: 'relative',
      zIndex: 1,
    },
  }),
  header: () => () => ({
    textAlign: 'center',
    marginBottom: '8px',
  }),
  title: () => (theme: Theme) => ({
    background: theme.cosmic.colors.titleGradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: theme.cosmic.colors.titleShadow,
  }),
  subtitle: () => (theme: Theme) => ({
    textAlign: 'center',
    color: theme.cosmic.colors.mutedText,
    marginBottom: theme.spacing(3),
    fontSize: '0.95rem',
    letterSpacing: '0.025em',
  }),
  form: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2.5),
    marginTop: theme.spacing(3),
  }),
  textField: () => (theme: Theme) => ({
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.cosmic.colors.glassBg,
      '&:hover': {
        backgroundColor: theme.cosmic.colors.glassHover,
      },
    },
  }),
  button: () => () => ({
    height: '48px',
    marginTop: '8px',
    fontWeight: 600,
    fontSize: '1rem',
    letterSpacing: '0.5px',
  }),
  link: () => (theme: Theme) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    '&:hover': {
      color: theme.palette.primary.light,
      textDecoration: 'underline',
    },
  }),
  error: () => (theme: Theme) => ({
    marginTop: theme.spacing(2),
  }),
  success: () => (theme: Theme) => ({
    marginTop: theme.spacing(2),
  }),
  linkContainer: () => (theme: Theme) => ({
    marginTop: theme.spacing(3),
    textAlign: 'center',
    color: theme.cosmic.colors.mutedText,
  }),
};
