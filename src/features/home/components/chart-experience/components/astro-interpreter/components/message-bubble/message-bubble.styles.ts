import { Theme } from '@mui/material';

export const styles = {
  container: (isUser: boolean) => (theme: Theme) => ({
    display: 'flex',
    justifyContent: isUser ? 'flex-end' : 'flex-start',
  }),
  bubble: (isUser: boolean) => (theme: Theme) => ({
    maxWidth: '80%',
    borderRadius: 2,
    p: 2.25,
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.06)',
    fontFamily: 'mystical, serif',
    fontSize: 18,
    lineHeight: 1.5,
    bgcolor: isUser ? 'rgba(138,43,226,0.35)' : 'rgba(13,12,34,0.8)',
    color: isUser ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)',
    boxShadow: isUser ? '0 0 16px rgba(138,43,226,0.35)' : '0 0 16px rgba(0,0,0,0.6)',
  }),
  markdown: () => (theme: Theme) => ({
    '& p': {
      m: 0,
      mb: 0.5,
    },
  }),
};
