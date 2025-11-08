import { Theme } from '@mui/material';

export const styles = {
  tooltip: (x: number, y: number) => (theme: Theme) => ({
    position: 'fixed',
    left: x + 12,
    top: y + 12,
    padding: '8px 10px',
    backgroundColor: 'rgba(6,6,20,0.98)',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.16)',
    boxShadow: '0 8px 22px rgba(0,0,0,0.5)',
    fontSize: 12,
    color: '#fff',
    pointerEvents: 'none',
    zIndex: 2000,
    maxWidth: 260,
  }),

  contentText: () => (theme: Theme) => ({
    fontWeight: 600,
  }),
};
