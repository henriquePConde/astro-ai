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
      deleteChart: 'Delete',
      deleteConfirmTitle: 'Delete chart',
      deleteConfirmDescription:
        'Are you sure you want to delete this chart? This will also delete its AI messages. This action cannot be undone.',
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
    columnWidths: {
      name: 'md',
      birthdate: 'md',
      createdAt: 'md',
      actions: 'sm',
    } as const,
  },
} as const;
