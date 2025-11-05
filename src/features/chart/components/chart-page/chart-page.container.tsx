'use client';

import { useState } from 'react';
import { ChartPageView } from './chart-page.view';
import { BirthDataFormContainer } from '@/features/birth-data';
import { useCalcChart } from '../../hooks/use-calc-chart.mutation';
import type { ChartData } from '../../services/chart.service';
import { ChartApplicationContainer } from '../chart-application/chart-application.container';

export function ChartPageContainer() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const calc = useCalcChart();

  const handleSubmit = async (v: any) => {
    const data = await calc.mutateAsync(v);
    setChartData(data);
  };

  return (
    <ChartPageView
      form={<BirthDataFormContainer onSubmit={handleSubmit} />}
      chartData={chartData}
      chartApp={chartData ? <ChartApplicationContainer data={chartData} /> : null}
      loading={calc.isPending}
      error={calc.error as any}
    />
  );
}
