'use client';

import { useMemo } from 'react';
import type { Theme } from '@mui/material/styles';

/**
 * Hook that returns a color function for usage indicators based on percentage thresholds.
 * - Returns red (error.main) when usage >= 80%
 * - Returns yellow (warning.main) when usage >= 50%
 * - Returns default (text.secondary) when usage < 50%
 *
 * @param used - The number of items used
 * @param limit - The total limit allowed
 * @returns A function that takes a theme and returns the appropriate color
 */
export function useUsageColor(used: number, limit: number): (theme: Theme) => string {
  return useMemo(() => {
    const usagePercentage = limit > 0 ? (used / limit) * 100 : 0;

    return (theme: Theme) => {
      if (usagePercentage >= 80) return theme.palette.error.main;
      if (usagePercentage >= 50) return theme.palette.warning.main;
      return theme.palette.text.secondary;
    };
  }, [used, limit]);
}
