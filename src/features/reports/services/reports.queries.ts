// src/features/reports/services/reports.queries.ts

import { useMutation, useQuery } from '@tanstack/react-query';
import { createReportJob, getDailyUsage, processReportJob } from './reports.service';
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

/**
 * Mutation hook for creating a new report job.
 */
export function useCreateReportJob() {
  return useMutation({
    mutationFn: createReportJob,
  });
}

/**
 * Query hook that drives a report job forward and polls its status.
 *
 * It calls /api/reports/process on each fetch; the server decides whether
 * there's more work to do. We keep polling while the job is pending/in_progress.
 */
export function useReportJob(jobId: string | null) {
  return useQuery({
    enabled: !!jobId,
    queryKey: reportsKeys.job(jobId ?? ''),
    queryFn: () => processReportJob(jobId as string),
    // In TanStack Query v5 the callback receives the query object, not data directly
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return false;
      return data.status === 'pending' || data.status === 'in_progress' ? 5000 : false;
    },
  });
}
