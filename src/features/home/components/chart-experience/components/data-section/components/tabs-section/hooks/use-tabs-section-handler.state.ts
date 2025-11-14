'use client';

import { useCallback } from 'react';
import type { SyntheticEvent } from 'react';
import type { DataSectionTab } from '../../../data-section.types';

export interface UseTabsSectionHandlerParams {
  onTabChange: (tab: DataSectionTab) => void;
}

export interface UseTabsSectionHandlerReturn {
  handleChange: (_: SyntheticEvent, value: DataSectionTab) => void;
}

/**
 * Hook that provides tab change handler.
 * Single responsibility: handle tab change events and call callback.
 */
export function useTabsSectionHandler({
  onTabChange,
}: UseTabsSectionHandlerParams): UseTabsSectionHandlerReturn {
  const handleChange = useCallback(
    (_: SyntheticEvent, value: DataSectionTab) => {
      onTabChange(value);
    },
    [onTabChange],
  );

  return {
    handleChange,
  };
}
