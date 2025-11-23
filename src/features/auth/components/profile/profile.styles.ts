import { Theme } from '@mui/material/styles';

export const styles = {
  root: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
  }),
  avatarWrapper: () => (theme: Theme) => ({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }),
  avatar: (size: number) => (theme: Theme) => ({
    width: size,
    height: size,
    cursor: 'pointer',
    bgcolor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      opacity: 0.9,
    },
  }),
  menuIndicator: () => (theme: Theme) => ({
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // Invert colors: white background, dark purple icon (reuse primary.main as charts background tone)
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    boxShadow: theme.shadows[1],
    border: `1px solid ${theme.palette.divider}`,
    cursor: 'pointer',
  }),
  menuIndicatorIcon: () => (theme: Theme) => ({
    fontSize: 14,
  }),
  menu: () => (theme: Theme) => ({
    '& .MuiPaper-root': {
      mt: 1,
      minWidth: 180,
    },
  }),
};
