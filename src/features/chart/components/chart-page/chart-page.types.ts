import type { ChartData } from '../../services/chart.service';

export interface ChartPageViewProps {
  form: React.ReactNode;
  chartData: ChartData | null;
  chartApp: React.ReactNode;
  loading?: boolean;
  error?: { message?: string } | null;
}
