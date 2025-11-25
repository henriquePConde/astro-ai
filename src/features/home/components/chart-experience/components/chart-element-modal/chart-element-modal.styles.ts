import type { Theme } from '@mui/material';

export const styles = {
  backdrop: (backdropOpacity: number) => (theme: Theme) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 100000, // Higher than mobile expand overlay
    backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  }),
  modal: (maxWidth: number, borderRadius: number) => (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(borderRadius),
    maxWidth: maxWidth,
    width: '100%',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: theme.shadows[24],
    position: 'relative',
  }),
  header: (contentSpacing: number) => (theme: Theme) => ({
    padding: theme.spacing(contentSpacing, contentSpacing, 0, contentSpacing),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  title: () => (theme: Theme) => ({
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),
  closeButton: () => (theme: Theme) => ({
    color: theme.palette.text.secondary,
    minWidth: 'auto',
    padding: theme.spacing(0.5),
  }),
  content: (contentSpacing: number) => (theme: Theme) => ({
    padding: theme.spacing(contentSpacing),
  }),
  infoItem: (itemSpacing: number) => (theme: Theme) => ({
    marginBottom: theme.spacing(itemSpacing),
    '&:last-child': {
      marginBottom: 0,
    },
  }),
  infoLabel: () => (theme: Theme) => ({
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
  }),
  infoValue: () => (theme: Theme) => ({
    fontSize: 16,
    color: theme.palette.text.primary,
    lineHeight: 1.4,
  }),
  planetColor: () => (theme: Theme) => ({
    display: 'inline-block',
    width: 12,
    height: 12,
    borderRadius: '50%',
    marginRight: theme.spacing(1),
    verticalAlign: 'middle',
  }),
  buttons: (buttonSpacing: number) => (theme: Theme) => ({
    padding: theme.spacing(0, buttonSpacing, buttonSpacing, buttonSpacing),
    display: 'flex',
    gap: theme.spacing(1),
    justifyContent: 'flex-end',
  }),
  askAIButton: () => (theme: Theme) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  closeButtonSecondary: () => (theme: Theme) => ({
    color: theme.palette.text.secondary,
    borderColor: theme.palette.divider,
  }),
};
