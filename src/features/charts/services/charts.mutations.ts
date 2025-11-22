import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteChartById } from './charts.service';
import { chartsKeys } from './charts.keys';

/**
 * Mutation hook for deleting a chart by ID.
 * Invalidates charts list queries on success.
 */
export function useDeleteChart() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteChartById(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: chartsKeys.lists() });
    },
  });
}
