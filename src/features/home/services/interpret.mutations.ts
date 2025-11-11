// src/features/home/services/interpret.mutations.ts

import { useMutation } from '@tanstack/react-query';
import { interpretChart, type InterpretChartPayload } from './interpret.service';

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
  return useMutation({
    mutationFn: async (variables: InterpretChartMutationVariables): Promise<string> => {
      const { onChunk, ...payload } = variables;
      return interpretChart(payload, onChunk);
    },
    // Note: Streaming mutations typically don't need retries
    retry: false,
  });
}
