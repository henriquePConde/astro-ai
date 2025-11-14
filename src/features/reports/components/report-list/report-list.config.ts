/**
 * Configuration and copy text for the report list component.
 * Centralized to avoid magical strings and enable easy content updates.
 */
export const REPORT_LIST_CONFIG = {
  copy: {
    title: 'Your Reports',
    loading: 'Loading…',
    error: 'Failed to load reports',
    empty: 'No reports yet',
    report: {
      fallbackPrefix: 'Report',
    },
  },
  ui: {
    title: {
      component: 'h2' as const,
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    loading: {
      spinnerSize: 20,
    },
    alert: {
      severity: 'error' as const,
    },
  },
  routes: {
    report: (id: string) => `/reports/${id}`,
  },
} as const;
