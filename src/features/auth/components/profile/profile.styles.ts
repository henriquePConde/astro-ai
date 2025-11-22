import { Theme } from '@mui/material/styles';

export const styles = {
  root: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
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
  menu: () => (theme: Theme) => ({
    '& .MuiPaper-root': {
      mt: 1,
      minWidth: 180,
    },
  }),
};
