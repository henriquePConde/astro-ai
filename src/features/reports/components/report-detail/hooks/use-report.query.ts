// src/features/reports/components/report-detail/hooks/use-report.query.ts

import { useQuery } from '@tanstack/react-query';
import { getReport } from '../../../services/reports.service';
import { reportsKeys } from '../../../services/reports.keys';

/**
 * Query hook for fetching a single report by ID.
 * Component-level query hook for report-detail component.
 */
export function useReport(id: string) {
  return useQuery({
    queryKey: reportsKeys.detail(id),
    queryFn: () => getReport(id),
    enabled: !!id,
    staleTime: 60_000,
  });
}
