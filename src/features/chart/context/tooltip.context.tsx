'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import type { TooltipState, TooltipContextType } from './tooltip.types';

export type { TooltipState } from './tooltip.types';

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const TooltipProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  const showTooltip = useCallback((state: TooltipState) => {
    setTooltip(state);
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip(null);
  }, []);

  return (
    <TooltipContext.Provider value={{ tooltip, showTooltip, hideTooltip }}>
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltip = () => {
  const ctx = useContext(TooltipContext);
  if (!ctx) {
    throw new Error('useTooltip must be used within TooltipProvider');
  }
  return ctx;
};
