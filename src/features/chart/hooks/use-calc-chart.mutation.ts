import { useMutation, useQueryClient } from '@tanstack/react-query';
import { calculateChart, type ChartData } from '../services/chart.service';
import { reportsKeys } from '@/features/reports/services/reports.keys';

export function useCalcChart() {
  const queryClient = useQueryClient();

  return useMutation<ChartData, unknown, Parameters<typeof calculateChart>[0]>({
    mutationFn: (payload) => calculateChart(payload),
    onSuccess: () => {
      // Invalidate daily usage query to refresh counts after chart calculation
      queryClient.invalidateQueries({ queryKey: reportsKeys.usage() });
    },
  });
}
