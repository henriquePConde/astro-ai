'use client';

import { useState } from 'react';
import { useCalcChart } from '@/features/chart/hooks/use-calc-chart.mutation';
import type { ChartData as ApiChartData } from '@/features/chart/services/chart.service';
import { transformApiChartDataToChartData } from '../../../services/chart-data.mapper';
import type { ChartData, BirthChartData } from '../../../types/chart.types';

export interface UseChartDataReturn {
  chartData: ApiChartData | null;
  transformedChartData: ChartData | null;
  birthData: BirthChartData | null;
  error: string | null;
  loading: boolean;
  handleNewChart: () => void;
  handleFormSubmit: (data: BirthChartData) => Promise<void>;
}

export function useChartData(): UseChartDataReturn {
  const [chartData, setChartData] = useState<ApiChartData | null>(null);
  const [transformedChartData, setTransformedChartData] = useState<ChartData | null>(null);
  const [birthData, setBirthData] = useState<BirthChartData | null>(null);
  const calcChart = useCalcChart();

  const handleNewChart = () => {
    setChartData(null);
    setTransformedChartData(null);
    setBirthData(null);
    calcChart.reset();
  };

  const handleFormSubmit = async (data: BirthChartData) => {
    try {
      setBirthData(data);
      const apiChartData = await calcChart.mutateAsync({
        name: data.name,
        year: data.year,
        month: data.month,
        day: data.day,
        hour: data.hour,
        minute: data.minute,
        city: data.city,
        nation: data.nation,
      });

      setChartData(apiChartData);
      const transformed = transformApiChartDataToChartData(apiChartData);
      setTransformedChartData(transformed);
    } catch (err) {
      // Error is handled by React Query mutation state
      console.error('Error fetching chart data:', err);
    }
  };

  return {
    chartData,
    transformedChartData,
    birthData,
    error:
      calcChart.error instanceof Error
        ? calcChart.error.message
        : calcChart.error
          ? String(calcChart.error)
          : null,
    loading: calcChart.isPending,
    handleNewChart,
    handleFormSubmit,
  };
}
