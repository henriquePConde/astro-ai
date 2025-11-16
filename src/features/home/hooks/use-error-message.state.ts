'use client';

import { useMemo } from 'react';

/**
 * Utility hook to normalize error objects into displayable error messages.
 * Single responsibility: transform various error shapes into string messages.
 */
export function useErrorMessage(...errors: Array<unknown | null | undefined>): string | null {
  // Serialize errors for stable dependency comparison
  const errorsKey = JSON.stringify(errors);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorsKey]);
}
