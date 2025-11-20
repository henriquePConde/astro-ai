'use client';

import { useState, useEffect } from 'react';
import { getTimeUntil24HourReset, formatTimeRemaining } from '../utils/time-utils';

/**
 * React hook that returns a formatted string of time remaining until 24 hours have passed
 * from the first generation timestamp. Updates every second automatically.
 *
 * @param firstGenerationAt ISO timestamp string of the first generation (optional)
 * @returns Formatted time string like "5 hours", "23 minutes", or "45 seconds"
 */
export function useTimeUntilReset(firstGenerationAt?: string): string {
  const [timeRemaining, setTimeRemaining] = useState(() =>
    formatTimeRemaining(getTimeUntil24HourReset(firstGenerationAt)),
  );

  useEffect(() => {
    // Update immediately on mount
    setTimeRemaining(formatTimeRemaining(getTimeUntil24HourReset(firstGenerationAt)));

    // Update every second
    const interval = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(getTimeUntil24HourReset(firstGenerationAt)));
    }, 1000);

    return () => clearInterval(interval);
  }, [firstGenerationAt]);

  return timeRemaining;
}
