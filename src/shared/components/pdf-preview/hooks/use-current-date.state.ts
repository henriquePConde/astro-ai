import { useState, useEffect } from 'react';

/**
 * Hook for managing current date state.
 * Component-level hook for local UI state only.
 */
export function useCurrentDate() {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  return currentDate;
}
