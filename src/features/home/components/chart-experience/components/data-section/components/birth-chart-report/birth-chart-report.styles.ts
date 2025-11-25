import type { Theme } from '@mui/material';

export const styles = {
  container: (maxWidth: number) => (theme: Theme) => ({
    maxWidth,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  }),
  root: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: '100%',
  }),

  header: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
  }),

  title: () => (theme: Theme) => ({
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.9)',
  }),

  subtitle: () => (theme: Theme) => ({
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  }),

  actions: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  }),

  error: () => (theme: Theme) => ({
    color: theme.palette.error.light,
    fontSize: 12,
  }),

  downloadButton: () => (theme: Theme) => ({
    position: 'relative',
  }),

  downloadContentWrapper: () => (theme: Theme) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  downloadSpinnerOverlay: () => (theme: Theme) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  }),

  generateButton: () => (theme: Theme) => ({
    position: 'relative',
  }),

  generateContentWrapper: () => (theme: Theme) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  generateSpinnerOverlay: () => (theme: Theme) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  }),

  stickyHeader: () => (theme: Theme) => ({
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2, 3),
    borderRadius: theme.spacing(1.5),
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),

  // Mobile accordion styles
  mobileAccordion: () => (theme: Theme) => ({
    width: '100%',
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    overflow: 'hidden',
  }),

  mobileAccordionHeader: () => (theme: Theme) => ({
    width: '100%',
    textAlign: 'left' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: 'none',
    background: 'transparent',
    color: theme.palette.text.primary,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    padding: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),

  mobileAccordionContent: () => (theme: Theme) => ({
    padding: theme.spacing(0, 2, 2, 2),
  }),

  mobileAccordionIcon: (isOpen: boolean) => ({
    display: 'inline-block',
    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
  }),

  mobileGenerateButton: () => (theme: Theme) => ({
    position: 'relative',
  }),

  mobileDownloadButton: () => (theme: Theme) => ({
    position: 'relative',
  }),
};
