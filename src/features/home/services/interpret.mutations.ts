// src/features/home/services/interpret.mutations.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { interpretChart, type InterpretChartPayload } from './interpret.service';
import { reportsKeys } from '@/features/reports/services/reports.keys';

export interface InterpretChartMutationVariables extends InterpretChartPayload {
  onChunk?: (chunk: string) => void;
}

/**
 * Mutation hook for interpreting a chart with streaming support.
 * Defined in services layer for reusability and separation of concerns.
 *
 * The onChunk callback can be passed as part of the mutation variables
 * to handle streaming chunks as they arrive.
 */
export function useInterpretChartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: InterpretChartMutationVariables): Promise<string> => {
      const { onChunk, ...payload } = variables;
      return interpretChart(payload, onChunk);
    },
    // Note: Streaming mutations typically don't need retries
    retry: false,
    onSuccess: () => {
      // Invalidate daily usage query to refresh counts after message sent
      queryClient.invalidateQueries({ queryKey: reportsKeys.usage() });
    },
  });
}
