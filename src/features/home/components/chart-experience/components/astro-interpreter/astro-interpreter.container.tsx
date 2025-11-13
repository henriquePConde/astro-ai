'use client';

import { useMemo } from 'react';
import type { ChartData as WheelChartData } from '@/shared/components/astro-chart/types';
import { AstroInterpreterView } from './astro-interpreter.view';
import { useInterpreter } from './hooks/use-interpreter';
import { useDailyUsage } from '@/features/reports/services/reports.queries';
import type { AstroInterpreterContainerProps } from './astro-interpreter.types';

export function AstroInterpreterContainer({ chartData }: AstroInterpreterContainerProps) {
  // Normalize to the wheel-style ChartData the AstroWheel & utils expect.
  const wheelData: WheelChartData = useMemo(
    () => ({
      planets: chartData.planets.map((p) => ({
        name: p.name,
        symbol: p.symbol,
        position: p.position, // degrees within sign segment or absolute? use same as AstroWheel
        absolutePosition: p.absolutePosition,
        sign: p.sign,
      })),
      houses: chartData.houses,
      aspects: chartData.aspects ?? [],
    }),
    [chartData],
  );

  const { input, setInput, isLoading, messages, handleSubmit } = useInterpreter(wheelData);
  const { data: usage } = useDailyUsage();

  return (
    <AstroInterpreterView
      messages={messages}
      isLoading={isLoading}
      input={input}
      onInputChange={setInput}
      onSubmit={handleSubmit}
      usage={usage}
    />
  );
}
