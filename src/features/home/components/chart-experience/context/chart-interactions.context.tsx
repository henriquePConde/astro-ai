'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { TooltipProvider, useTooltip } from './tooltip.context';
import type { TooltipState } from './tooltip.types';
import type { ChartInteractionsContextType } from './chart-interactions.types';

const ChartInteractionsContext = createContext<ChartInteractionsContextType | undefined>(undefined);

const InnerInteractionsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { showTooltip, hideTooltip } = useTooltip();
  const [enabled, setEnabled] = useState(true);

  const value = useMemo<ChartInteractionsContextType>(
    () => ({
      enabled,
      toggleEnabled: () => setEnabled((v) => !v),
      setEnabled,

      onPlanetHover: (planet, evt) => {
        if (!enabled) return;
        const e = evt as MouseEvent;
        const state: TooltipState = {
          kind: 'planet',
          x: e.clientX,
          y: e.clientY,
          name: planet.name,
          symbol: planet.symbol,
          degree: planet.degree,
          signLabel: planet.signLabel,
          house: planet.house,
          color: planet.color,
        };
        showTooltip(state);
      },
      onPlanetLeave: () => {
        if (!enabled) return;
        hideTooltip();
      },

      onHouseHover: (house, evt) => {
        if (!enabled) return;
        const e = evt as MouseEvent;
        showTooltip({
          kind: 'house',
          x: e.clientX,
          y: e.clientY,
          number: house.number,
          degree: house.degree,
        });
      },
      onHouseLeave: () => {
        if (!enabled) return;
        hideTooltip();
      },

      onSignHover: (index, evt) => {
        if (!enabled) return;
        const e = evt as MouseEvent;
        showTooltip({
          kind: 'sign',
          x: e.clientX,
          y: e.clientY,
          index,
        });
      },
      onSignLeave: () => {
        if (!enabled) return;
        hideTooltip();
      },

      onAspectHover: (aspect, evt) => {
        if (!enabled) return;
        const e = evt as MouseEvent;
        showTooltip({
          kind: 'aspect',
          x: e.clientX,
          y: e.clientY,
          type: aspect.type,
          p1: aspect.p1,
          p2: aspect.p2,
          angle: aspect.angle,
        });
      },
      onAspectLeave: () => {
        if (!enabled) return;
        hideTooltip();
      },
    }),
    [enabled, showTooltip, hideTooltip],
  );

  return (
    <ChartInteractionsContext.Provider value={value}>{children}</ChartInteractionsContext.Provider>
  );
};

export const ChartInteractionsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <TooltipProvider>
    <InnerInteractionsProvider>{children}</InnerInteractionsProvider>
  </TooltipProvider>
);

export const useChartInteractions = () => {
  const ctx = useContext(ChartInteractionsContext);
  if (!ctx) {
    throw new Error('useChartInteractions must be used within ChartInteractionsProvider');
  }
  return ctx;
};

/**
 * For components that might render outside provider (e.g. AstroWheel preview).
 * Returns null when interactions are unavailable.
 */
export const useOptionalChartInteractions = () => useContext(ChartInteractionsContext) ?? null;
