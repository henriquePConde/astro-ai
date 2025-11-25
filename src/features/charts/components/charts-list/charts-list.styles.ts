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
    // Take full height minus app header
    height: 'calc(100vh - 89px)',
    mt: '89px',
    display: 'flex',
    flexDirection: 'column',
    // Allow the table to use more horizontal space while staying centered.
    maxWidth: 1400,
    mx: 'auto',
    px: 3,
    // On mobile, use full width with only a small right margin
    [theme.breakpoints.down('sm')]: {
      px: 2,
      pr: 1,
      maxWidth: 'none',
      mx: 0,
    },
  }),
  header: () => (theme: Theme) => ({
    py: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 2,
    flexShrink: 0, // Prevent header from shrinking
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
  searchBox: () => (theme: Theme) => ({
    minWidth: 300,
    maxWidth: 400,
  }),
  scrollableContent: () => (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    px: 0,
    pb: 3,
    // Custom scrollbar styling to match the app theme
    '&::-webkit-scrollbar': {
      width: 6,
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(138, 43, 226, 0.35)',
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'rgba(138, 43, 226, 0.5)',
    },
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
    minWidth: 0,
    flexWrap: 'nowrap',
  }),
  nameText: () => (theme: Theme) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
  actionsRow: (isMobile: boolean) => (theme: Theme) => ({
    display: 'flex',
    gap: isMobile ? theme.spacing(0.75) : theme.spacing(1),
    flexWrap: 'nowrap',
  }),
  // Primary "Go to chart" button styling.
  goToChartButton: (isMobile: boolean) => (theme: Theme) => ({
    whiteSpace: 'nowrap',
    minWidth: isMobile ? 80 : 130,
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
