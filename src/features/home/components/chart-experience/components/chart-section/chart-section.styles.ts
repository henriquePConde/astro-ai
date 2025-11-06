import { Theme } from '@mui/material';

export const styles = {
  container:
    (isExpanded: boolean, isDragging: boolean, splitPosition?: number) => (theme: Theme) => {
      const baseStyles = {
        height: '100%',
        bgcolor: 'rgba(13, 12, 34, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        p: 3,
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 0 30px -12px rgba(138, 43, 226, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        transition: isDragging ? 'none' : 'all 300ms',
      };

      if (isExpanded && splitPosition) {
        return { ...baseStyles, width: `${splitPosition}%` };
      } else if (!isExpanded) {
        return { ...baseStyles, width: { xs: '100%', lg: '50%' } };
      } else {
        return baseStyles;
      }
    },
  chartWrapper: () => (theme: Theme) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden',
  }),
  chartInner: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 450,
    minHeight: '100%',
    width: '100%',
    height: '100%',
    p: 2,
  }),
};
