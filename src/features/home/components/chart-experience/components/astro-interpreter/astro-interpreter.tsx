'use client';

import { useMemo } from 'react';
import { Box } from '@mui/material';
import type { ChartData as HomeChartData } from '@/features/home/types/chart.types';
import type { ChartData as WheelChartData } from '@/shared/components/astro-chart/types';
import { MessageList } from './components/message-list/message-list';
import { InputForm } from './components/input-form';
import { useInterpreter } from './hooks/use-interpreter';

interface AstroInterpreterProps {
  chartData: HomeChartData;
}

export const AstroInterpreter = ({ chartData }: AstroInterpreterProps) => {
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: 2,
      }}
    >
      <MessageList messages={messages} isLoading={isLoading} />
      <InputForm input={input} onChange={setInput} onSubmit={handleSubmit} disabled={isLoading} />
    </Box>
  );
};

export default AstroInterpreter;
