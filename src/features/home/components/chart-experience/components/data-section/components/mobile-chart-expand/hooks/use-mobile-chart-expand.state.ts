import { useState, useEffect, useRef } from 'react';

/**
 * UI state hook for mobile chart expand view.
 * Component-level hook for local UI state only (no I/O).
 */
export function useMobileChartExpandState(isExpanded: boolean) {
  const [interactionsOpen, setInteractionsOpen] = useState(true);
  const chartKeyRef = useRef(0);

  useEffect(() => {
    if (isExpanded) {
      chartKeyRef.current = Date.now();
    }
  }, [isExpanded]);

  return {
    interactionsOpen,
    setInteractionsOpen,
    chartKey: chartKeyRef.current,
  };
}
