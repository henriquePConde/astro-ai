import { Theme } from '@mui/material';

export const styles = {
  container: (isExpanded: boolean, isDragging: boolean) => (theme: Theme) => ({
    transition: isDragging ? 'none' : 'all 300ms',
    height: isExpanded ? '100vh' : 'calc(100% - 2rem)',
    mt: isExpanded ? 0 : 2,
    mb: isExpanded ? 0 : 2,
    display: 'flex',
    flexDirection: { xs: 'column', lg: 'row' },
    gap: 2,
    alignItems: 'flex-start',
    position: 'relative',
  }),
};
