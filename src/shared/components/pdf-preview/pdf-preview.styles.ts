// src/shared/components/pdf-preview/pdf-preview.styles.ts
import { Theme } from '@mui/material';

export const pdfPreviewStyles = {
  root: () => (theme: Theme) => ({
    minHeight: '100vh',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.grey[100],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    boxSizing: 'border-box',
  }),

  documentWrapper: () => (theme: Theme) => ({
    width: '100%',
    maxWidth: 900,
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[4],
    borderRadius: theme.shape.borderRadius * 2,
    overflow: 'hidden',
    position: 'relative',
  }),

  page: () => (theme: Theme) => ({
    padding: theme.spacing(6),
    boxSizing: 'border-box',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-of-type': {
      borderBottom: 'none',
    },
  }),

  coverTitle: () => (theme: Theme) => ({
    fontSize: '2.2rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  }),

  coverSubtitle: () => (theme: Theme) => ({
    fontSize: '1rem',
    color: theme.palette.text.secondary,
  }),

  sectionHeader: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
  }),

  sectionIcon: () => (theme: Theme) => ({
    width: 28,
    height: 28,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  }),

  sectionTitle: () => (theme: Theme) => ({
    fontSize: '1.3rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),

  sectionBody: () => (theme: Theme) => ({
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
    '& p': {
      marginBottom: theme.spacing(1.5),
    },
  }),

  footer: () => (theme: Theme) => ({
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: theme.palette.text.disabled,
  }),

  chartImage: () => (theme: Theme) => ({
    display: 'block',
    margin: `${theme.spacing(4)} auto ${theme.spacing(1)}`,
    maxWidth: '70%',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
  }),

  offscreenChartContainer: () => () => ({
    position: 'absolute',
    top: -9999,
    left: -9999,
    width: 600,
    height: 600,
    overflow: 'hidden',
    pointerEvents: 'none',
    opacity: 0,
  }),
};
