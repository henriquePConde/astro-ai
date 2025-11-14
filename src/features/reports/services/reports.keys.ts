export const reportsKeys = {
  all: ['reports'] as const,
  list: () => [...reportsKeys.all, 'list'] as const,
  detail: (id: string) => [...reportsKeys.all, 'detail', id] as const,
  usage: () => [...reportsKeys.all, 'daily-usage'] as const,
};
