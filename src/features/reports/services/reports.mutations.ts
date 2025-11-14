// src/features/reports/services/reports.mutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReport } from './reports.service';
import { reportsKeys } from './reports.keys';

/**
 * Mutation hook for creating a new report.
 * Defined in services layer for reusability across components.
 */
export function useCreateReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: reportsKeys.list() });
    },
  });
}
