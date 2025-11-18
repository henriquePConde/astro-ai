import { Theme } from '@mui/material';

export const styles = {
  root: () => (theme: Theme) => ({
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5, 2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    // keep width nicely contained within the chat
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    // ensure this panel never pushes the input off-screen
    maxHeight: theme.spacing(24),
    overflowY: 'auto',
  }),
  header: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing(1),
  }),
  headerText: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
    minWidth: 0,
  }),
  title: () => (theme: Theme) => ({
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.secondary,
  }),
  subtitle: () => (theme: Theme) => ({
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.text.disabled,
  }),
  chipsContainer: () => (theme: Theme) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1.25),
  }),
  chip: (disabled: boolean) => (theme: Theme) => ({
    textTransform: 'none',
    fontSize: theme.typography.body1.fontSize as string | number,
    paddingInline: theme.spacing(1.25),
    paddingBlock: theme.spacing(0.25),
    color: theme.palette.common.white,
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark,
    },
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
  }),
};
