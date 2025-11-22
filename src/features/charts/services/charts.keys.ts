export const chartsKeys = {
  all: ['charts'] as const,
  lists: () => [...chartsKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...chartsKeys.lists(), filters] as const,
  details: () => [...chartsKeys.all, 'detail'] as const,
  detail: (id: string) => [...chartsKeys.details(), id] as const,
};
