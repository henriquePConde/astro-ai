import type { ChartData, BirthChartData } from '@/features/home/types/chart.types';
import type { ChartData as ApiChartData } from '@/features/chart/services/chart.service';

export interface ChartApplicationProps {
  chartData: ApiChartData | null;
  transformedChartData: ChartData | null;
  loading: boolean;
  error: string | null;
  isExpanded: boolean;
  isDragging: boolean;
  splitPosition: number;
  currentSection: number;
  introFinished: boolean;
  birthData: BirthChartData;
  onFormSubmit: (data: any) => Promise<void>;
  onNewChart: () => void;
  onToggleExpand: () => void;
  onDragStart: () => void;
  onDrag: (e: React.MouseEvent) => void;
  onDragEnd: () => void;
}

