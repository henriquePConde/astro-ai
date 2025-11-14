'use client';

import { useMemo } from 'react';

/**
 * Utility hook to normalize error objects into displayable error messages.
 * Single responsibility: transform various error shapes into string messages.
 */
export function useErrorMessage(...errors: Array<unknown | null | undefined>): string | null {
  return useMemo(() => {
    for (const error of errors) {
      if (error instanceof Error) {
        return error.message;
      }
      if (error) {
        return String(error);
      }
    }
    return null;
  }, errors);
}
