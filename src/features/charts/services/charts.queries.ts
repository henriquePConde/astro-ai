import { useQuery } from '@tanstack/react-query';
import {
  listCharts,
  getChartById,
  type ChartsListFilters,
  type ChartsListResponse,
  type ChartDetailResponse,
} from './charts.service';
import { chartsKeys } from './charts.keys';

/**
 * Query hook for fetching paginated charts list.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useCharts(filters: ChartsListFilters) {
  return useQuery<ChartsListResponse, Error>({
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
  return useQuery<ChartDetailResponse, Error>({
    queryKey: chartsKeys.detail(id),
    queryFn: () => getChartById(id),
    enabled: !!id,
    // Always fetch fresh data when navigating to a chart detail.
    // Setting staleTime/gcTime to 0 ensures we don't reuse any cached
    // response between navigations, so "Go to chart" always reflects
    // the latest chat history and report from the backend.
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnReconnect: 'always',
    refetchOnWindowFocus: 'always',
  });
}
