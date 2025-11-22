import { Theme } from '@mui/material/styles';

// Semantic width tokens mapped to actual column widths.
// Keep numbers here so the config can stay expressive (sm/md/lg/xl).
const COLUMN_WIDTHS: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
  sm: '10%',
  md: '20%',
  lg: '35%',
  xl: '45%',
};

export const styles = {
  root: () => (theme: Theme) => ({
    p: 3,
    // Leave space for the global app header so the search bar isn't hidden underneath it.
    // Header height is ~89px (same as chart experience layout).
    mt: '89px',
    // Allow the table to use more horizontal space while staying centered.
    maxWidth: 1400,
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
  // Generic column width helper: use tokens like "sm", "md", "lg", "xl" in config.
  column: (size: keyof typeof COLUMN_WIDTHS) => (theme: Theme) => ({
    width: COLUMN_WIDTHS[size],
  }),
  // Row of action buttons ("Go to chart" + "Delete") within the actions column.
  actionsRow: () => (theme: Theme) => ({
    display: 'flex',
    gap: theme.spacing(1),
  }),
  // Primary "Go to chart" button styling.
  goToChartButton: () => (theme: Theme) => ({
    whiteSpace: 'nowrap',
    minWidth: 130,
  }),
  // Delete dialog - cancel button styling.
  deleteDialogCancelButton: () => (theme: Theme) => ({
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
  }),
  // Delete dialog - confirm button styling.
  deleteDialogConfirmButton: () => (theme: Theme) => ({
    minWidth: 110,
  }),
};
