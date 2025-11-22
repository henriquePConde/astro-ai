import type { Theme } from '@mui/material/styles';

const COLUMN_WIDTHS: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
  sm: '10%',
  md: '20%',
  lg: '35%',
  xl: '45%',
};

export const dataTableStyles = {
  tableContainer: () => (theme: Theme) => ({
    mt: 2,
  }),
  table: () => (theme: Theme) => ({
    minWidth: 650,
  }),
  column: (size: keyof typeof COLUMN_WIDTHS) => (theme: Theme) => ({
    width: COLUMN_WIDTHS[size],
  }),
  sortableHeader: () => (theme: Theme) => ({
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      bgcolor: theme.palette.action.hover,
    },
  }),
  pagination: () => (theme: Theme) => ({
    mt: 3,
    display: 'flex',
    justifyContent: 'center',
  }),
};
