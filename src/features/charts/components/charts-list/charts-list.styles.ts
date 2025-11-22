import { Theme } from '@mui/material/styles';

export const styles = {
  root: () => (theme: Theme) => ({
    p: 3,
    maxWidth: 1200,
    mx: 'auto',
  }),
  header: () => (theme: Theme) => ({
    mb: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 2,
  }),
  searchBox: () => (theme: Theme) => ({
    minWidth: 300,
    maxWidth: 400,
  }),
  tableContainer: () => (theme: Theme) => ({
    mt: 2,
  }),
  table: () => (theme: Theme) => ({
    minWidth: 650,
  }),
  avatar: (size: number) => (theme: Theme) => ({
    width: size,
    height: size,
    bgcolor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
  }),
  nameCell: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  }),
  sortableHeader: () => (theme: Theme) => ({
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      bgcolor: theme.palette.action.hover,
    },
  }),
  emptyState: () => (theme: Theme) => ({
    textAlign: 'center',
    py: 8,
  }),
  pagination: () => (theme: Theme) => ({
    mt: 3,
    display: 'flex',
    justifyContent: 'center',
  }),
};
