/**
 * Configuration and copy text for the charts list component.
 * Centralized to avoid magical strings and enable easy content updates.
 */
export const CHARTS_LIST_CONFIG = {
  copy: {
    title: 'My Charts',
    searchPlaceholder: 'Search by name...',
    columns: {
      name: 'Name',
      birthdate: 'Birthdate',
      createdAt: 'Created At',
      actions: 'Actions',
    },
    actions: {
      goToChart: 'Go to chart',
    },
    empty: {
      title: 'No charts found',
      description: "You haven't created any charts yet. Create your first chart to get started.",
    },
    loading: 'Loading charts...',
    error: 'Failed to load charts. Please try again.',
  },
  ui: {
    pageSize: 20,
    defaultSortBy: 'createdAt' as const,
    defaultSortOrder: 'desc' as const,
  },
} as const;
