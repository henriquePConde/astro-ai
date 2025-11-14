import { Theme } from '@mui/material/styles';

export const styles = {
  root: () => (theme: Theme) => ({
    padding: theme.spacing(1.5, 2),
    borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(3, 7, 32, 0.8)',
    backdropFilter: 'blur(8px)',
    color: theme.palette.common.white,
  }),
  toolbar: () => (_theme: Theme) => ({
    width: '100%',
    justifyContent: 'space-between',
  }),
  headerContent: () => (_theme: Theme) => ({}),
};
