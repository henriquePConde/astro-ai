// tabs-section.styles.ts
import type { Theme } from '@mui/material';

export const styles = {
  root: () => (theme: Theme) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(1),
  }),
  tabs: () => (theme: Theme) => ({
    minHeight: 40,
    '& .MuiTab-root': {
      minHeight: 40,
      textTransform: 'none',
      fontWeight: 500,
      fontSize: 14,
    },
  }),
  tab: (selected: boolean) => (theme: Theme) => ({
    color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
  }),
};
