import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    cosmic: {
      colors: {
        deepSpace: string;
        spaceCard: string;
        gradientStart: string;
        gradientEnd: string;
        glassBorder: string;
        glassBg: string;
        glassHover: string;
        purpleGlow: string;
        purpleGlowHover: string;
        whiteText: string;
        mutedText: string;
        titleGradient: string;
        titleShadow: string;
        overlayGradient: string;
      };
      effects: {
        backdropBlur: string;
        cardBlur: string;
        borderRadius: number;
      };
    };
  }
  interface ThemeOptions {
    cosmic?: {
      colors?: {
        deepSpace?: string;
        spaceCard?: string;
        gradientStart?: string;
        gradientEnd?: string;
        glassBorder?: string;
        glassBg?: string;
        glassHover?: string;
        purpleGlow?: string;
        purpleGlowHover?: string;
        whiteText?: string;
        mutedText?: string;
        titleGradient?: string;
        titleShadow?: string;
        overlayGradient?: string;
      };
      effects?: {
        backdropBlur?: string;
        cardBlur?: string;
        borderRadius?: number;
      };
    };
  }
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8A2BE2',
      light: '#9370DB',
      dark: '#7B1FA2',
    },
    secondary: {
      main: '#4169E1',
      light: '#5B82EB',
      dark: '#2E4DBE',
    },
    error: {
      main: '#ef5350',
      light: '#ff6b69',
      dark: '#c62828',
    },
    warning: {
      main: '#FFD700',
      light: '#FFE55C',
      dark: '#E6C200',
    },
    info: {
      main: '#00BCD4',
      light: '#33D7EB',
      dark: '#0097A7',
    },
    success: {
      main: '#4caf50',
      light: '#6BC66F',
      dark: '#2e7d32',
    },
    background: {
      default: '#020518',
      paper: '#030720',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.6)',
    },
  },
  typography: {
    fontFamily: [
      'var(--font-cinzel)',
      'Cinzel',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.025em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.02em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.5px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #8A2BE2 0%, #4169E1 100%)',
          boxShadow: '0 8px 32px rgba(138, 43, 226, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #9370DB 0%, #5B82EB 100%)',
            boxShadow: '0 12px 40px rgba(138, 43, 226, 0.6)',
          },
          '&:disabled': {
            background: 'rgba(138, 43, 226, 0.3)',
            color: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: 'rgba(138, 43, 226, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(138, 43, 226, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8A2BE2',
              borderWidth: '2px',
              boxShadow: '0 0 20px rgba(138, 43, 226, 0.4)',
            },
            '& input': {
              color: 'rgba(255, 255, 255, 0.9)',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)',
            '&.Mui-focused': {
              color: '#8A2BE2',
            },
          },
          '& .MuiFormHelperText-root': {
            color: 'rgba(255, 255, 255, 0.5)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backdropFilter: 'blur(10px)',
        },
        standardError: {
          backgroundColor: 'rgba(239, 83, 80, 0.15)',
          border: '1px solid rgba(239, 83, 80, 0.3)',
        },
        standardSuccess: {
          backgroundColor: 'rgba(76, 175, 80, 0.15)',
          border: '1px solid rgba(76, 175, 80, 0.3)',
        },
      },
    },
  },
  cosmic: {
    colors: {
      deepSpace: '#020518',
      spaceCard: '#030720',
      gradientStart: 'rgba(13, 12, 34, 0.8)',
      gradientEnd: 'rgba(49, 35, 89, 0.85)',
      glassBorder: 'rgba(255, 255, 255, 0.1)',
      glassBg: 'rgba(255, 255, 255, 0.05)',
      glassHover: 'rgba(255, 255, 255, 0.08)',
      purpleGlow: 'rgba(138, 43, 226, 0.2)',
      purpleGlowHover: 'rgba(138, 43, 226, 0.4)',
      whiteText: 'rgba(255, 255, 255, 0.9)',
      mutedText: 'rgba(255, 255, 255, 0.6)',
      titleGradient: 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(200, 220, 255, 0.9))',
      titleShadow: '0 2px 8px rgba(138, 43, 226, 0.3)',
      overlayGradient: 'linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(65, 105, 225, 0.1))',
    },
    effects: {
      backdropBlur: 'blur(20px)',
      cardBlur: 'blur(10px)',
      borderRadius: 2,
    },
  },
});
