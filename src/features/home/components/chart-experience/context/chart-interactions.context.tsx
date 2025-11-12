'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { TooltipProvider, useTooltip } from './tooltip.context';
import type { TooltipState } from './tooltip.types';
import type { ChartInteractionsContextType } from './chart-interactions.types';

const ChartInteractionsContext = createContext<ChartInteractionsContextType | undefined>(undefined);

const InnerInteractionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        // Validate that we have valid coordinates
        if (
          typeof e.clientX !== 'number' ||
          typeof e.clientY !== 'number' ||
          isNaN(e.clientX) ||
          isNaN(e.clientY)
        ) {
          console.warn('Invalid mouse coordinates for planet hover:', e);
          return;
        }
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
        hideTooltip();
      },

      onHouseHover: (house, evt) => {
        if (!enabled) return;
        const e = evt as MouseEvent;
        // Validate that we have valid coordinates
        if (
          typeof e.clientX !== 'number' ||
          typeof e.clientY !== 'number' ||
          isNaN(e.clientX) ||
          isNaN(e.clientY)
        ) {
          console.warn('Invalid mouse coordinates for house hover:', e);
          return;
        }
        showTooltip({
          kind: 'house',
          x: e.clientX,
          y: e.clientY,
          number: house.number,
          degree: house.degree,
        });
      },
      onHouseLeave: () => {
        hideTooltip();
      },

      onSignHover: (index, evt) => {
        if (!enabled) return;
        const e = evt as MouseEvent;
        // Validate that we have valid coordinates
        if (
          typeof e.clientX !== 'number' ||
          typeof e.clientY !== 'number' ||
          isNaN(e.clientX) ||
          isNaN(e.clientY)
        ) {
          console.warn('Invalid mouse coordinates for sign hover:', e);
          return;
        }
        showTooltip({
          kind: 'sign',
          x: e.clientX,
          y: e.clientY,
          index,
        });
      },
      onSignLeave: () => {
        hideTooltip();
      },

      onAspectHover: (aspect, evt) => {
        if (!enabled) return;
        const e = evt as MouseEvent;
        // Validate that we have valid coordinates
        if (
          typeof e.clientX !== 'number' ||
          typeof e.clientY !== 'number' ||
          isNaN(e.clientX) ||
          isNaN(e.clientY)
        ) {
          console.warn('Invalid mouse coordinates for aspect hover:', e);
          return;
        }
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
        hideTooltip();
      },
    }),
    [enabled, showTooltip, hideTooltip],
  );

  return (
    <ChartInteractionsContext.Provider value={value}>{children}</ChartInteractionsContext.Provider>
  );
};

export const ChartInteractionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
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

export const useOptionalChartInteractions = () => useContext(ChartInteractionsContext) ?? null;
