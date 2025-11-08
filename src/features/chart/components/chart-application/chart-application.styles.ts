import { Theme } from '@mui/material';

export const styles = {
  root: () => (theme: Theme) => ({
    position: 'fixed',
    top: '152px', // respect header height
    left: 0,
    right: 0,
    height: 'calc(100vh - 152px)',
    zIndex: 50,
    bgcolor: 'rgba(6,6,20,0.98)',
  }),

  controlsContainer: () => (theme: Theme) => ({
    position: 'absolute',
    top: 16,
    right: 24,
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  }),

  expandButton: () => (theme: Theme) => ({
    borderRadius: 999,
    textTransform: 'none',
    px: 2,
    py: 0.5,
    borderColor: 'rgba(255,255,255,0.35)',
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
  }),

  newChartButton: () => (theme: Theme) => ({
    borderRadius: 999,
    textTransform: 'none',
    px: 2.5,
    py: 0.7,
    fontSize: 12,
    bgcolor: '#7a3cff',
    '&:hover': { bgcolor: '#9060ff' },
  }),

  mainLayout: () => (theme: Theme) => ({
    display: 'flex',
    gap: 0,
    height: '100%',
    alignItems: 'stretch',
    px: 0,
    pt: 64,
  }),

  chartSide: (splitPosition: number) => (theme: Theme) => ({
    flex: `0 0 ${splitPosition}%`,
    minWidth: 260,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pl: 40,
    pr: 24,
  }),

  dragHandle: () => (theme: Theme) => ({
    width: 6,
    cursor: 'col-resize',
    bgcolor: 'rgba(122,60,255,0.8)',
    borderRadius: 999,
    alignSelf: 'center',
    height: '40%',
  }),

  rightPanel: (splitPosition: number) => (theme: Theme) => ({
    flex: `1 1 ${100 - splitPosition}%`,
    minWidth: 260,
    px: 32,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color: 'rgba(255,255,255,0.45)',
    fontSize: 13,
    letterSpacing: 1.5,
  }),
};
