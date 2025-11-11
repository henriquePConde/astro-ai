import { Theme } from '@mui/material';

interface TooltipPosition {
  x: number;
  y: number;
}

export const styles = {
  tooltip: (position: TooltipPosition) => (theme: Theme) => ({
    position: 'fixed' as const,
    top: position.y + 12,
    left: position.x + 12,
    maxWidth: 260,
    bgcolor: 'rgba(10,10,20,0.98)',
    color: '#fff',
    borderRadius: 1,
    border: '1px solid rgba(255,255,255,0.15)',
    p: 1.5,
    zIndex: 9999,
    pointerEvents: 'auto' as const,
    boxShadow: 3,
    fontSize: 12,
  }),
  title: () => (theme: Theme) => ({
    fontWeight: 600,
  }),
  closeButton: () => (theme: Theme) => ({
    mt: 0.5,
    textAlign: 'right' as const,
    cursor: 'pointer',
    fontSize: 10,
    opacity: 0.7,
  }),
};
