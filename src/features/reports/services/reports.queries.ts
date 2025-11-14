// src/features/reports/services/reports.queries.ts

import { useQuery } from '@tanstack/react-query';
import { getDailyUsage } from './reports.service';
import { reportsKeys } from './reports.keys';

/**
 * Query hook for fetching daily usage statistics.
 * Defined in services layer for reusability across components.
 */
export function useDailyUsage() {
  return useQuery({
    queryKey: reportsKeys.usage(),
    queryFn: () => getDailyUsage(),
    staleTime: 60_000,
  });
}
