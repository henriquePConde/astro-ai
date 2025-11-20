import { Theme } from '@mui/material';

export const styles = {
  container:
    (isExpanded: boolean, isDragging: boolean, splitPosition?: number) => (theme: Theme) => {
      const baseStyles = {
        height: '100%',
        bgcolor: theme.cosmic.colors.gradientStart,
        backdropFilter: theme.cosmic.effects.backdropBlur,
        borderRadius: theme.spacing(0.5), // 4px = 0.5 * 8px spacing unit
        p: 3,
        border: `1px solid ${theme.cosmic.colors.glassBg}`,
        boxShadow: `0 0 30px -12px rgba(138, 43, 226, 0.15)`, // Using specific shadow opacity, could be added to theme if reused
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
    position: 'relative',
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
