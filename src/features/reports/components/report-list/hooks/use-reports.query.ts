// src/features/reports/components/report-list/hooks/use-reports.query.ts

import { useQuery } from '@tanstack/react-query';
import { listReports } from '../../../services/reports.service';
import { reportsKeys } from '../../../services/reports.keys';

/**
 * Query hook for fetching the list of reports.
 * Component-level query hook for report-list component.
 */
export function useReports() {
  return useQuery({
    queryKey: reportsKeys.list(),
    queryFn: () => listReports(),
    staleTime: 60_000,
  });
}
