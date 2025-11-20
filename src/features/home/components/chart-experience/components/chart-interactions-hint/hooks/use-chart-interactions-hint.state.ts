'use client';

import { useState, useCallback } from 'react';

export function useChartInteractionsHintState() {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    toggle,
  };
}
