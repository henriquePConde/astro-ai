// src/features/home/components/chart-experience/section-content.styles.ts
import { Theme } from '@mui/material';

export const sectionContentStyles = {
  root: () => (theme: Theme) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    boxSizing: 'border-box',
  }),
};
