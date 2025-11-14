/**
 * Configuration and copy text for the report detail component.
 * Centralized to avoid magical strings and enable easy content updates.
 */
export const REPORT_DETAIL_CONFIG = {
  copy: {
    title: 'Birth Chart Report',
    subtitle: 'Generated insights for your astrological blueprint',
    loading: 'Loading…',
    error: 'Failed to load report',
    section: {
      introduction: 'Introduction',
    },
    button: {
      openPdfPreview: 'Open PDF Preview',
    },
  },
  ui: {
    title: {
      component: 'h2' as const,
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    subtitle: {
      component: 'p' as const,
      fontSize: '0.875rem',
    },
    loading: {
      spinnerSize: 20,
    },
    alert: {
      severity: 'error' as const,
    },
    button: {
      variant: 'outlined' as const,
    },
    section: {
      variant: 'subtitle1' as const,
    },
  },
  routes: {
    pdfPreview: (reportId: string) => `/pdf-preview/public?id=${reportId}&pdfToken=demo`,
  },
} as const;
