import { useQuery } from '@tanstack/react-query';
import { listCharts, getChartById, type ChartsListFilters } from './charts.service';
import { chartsKeys } from './charts.keys';

/**
 * Query hook for fetching paginated charts list.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useCharts(filters: ChartsListFilters) {
  return useQuery({
    queryKey: chartsKeys.list(filters),
    queryFn: () => listCharts(filters),
    staleTime: 30_000, // 30 seconds
  });
}

/**
 * Query hook for fetching a single chart by ID.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useChart(id: string) {
  return useQuery({
    queryKey: chartsKeys.detail(id),
    queryFn: () => getChartById(id),
    enabled: !!id,
    staleTime: 60_000, // 1 minute
  });
}
