import type { ChartData as HomeChartData } from '@/features/home/types/chart.types';

export interface AstroInterpreterContainerProps {
  chartData: HomeChartData;
}

export interface AstroInterpreterViewProps {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  isLoading: boolean;
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}
