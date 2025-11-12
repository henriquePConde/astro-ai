import { Theme } from '@mui/material';

export const styles = {
  tooltip: (x: number, y: number) => (theme: Theme) => ({
    position: 'fixed',
    // Use calc() to combine numeric coordinates with theme spacing string (e.g., "12px")
    left: `calc(${x}px + ${theme.spacing(1.5)})`,
    top: `calc(${y}px + ${theme.spacing(1.5)})`,
    padding: theme.spacing(1, 1.25),
    backgroundColor: 'rgba(6,6,20,0.98)',
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.cosmic.colors.glassBorder}`,
    boxShadow: '0 8px 22px rgba(0,0,0,0.5)',
    fontSize: 12,
    color: theme.cosmic.colors.whiteText,
    pointerEvents: 'none',
    zIndex: 2000,
    maxWidth: theme.spacing(32.5),
  }),

  contentText: () => (theme: Theme) => ({
    fontWeight: 600,
  }),
};
