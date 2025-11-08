import type { ChartData, BirthChartData } from '@/features/home/types/chart.types';

export interface ChartContentProps {
  chartData: ChartData | null;
  isExpanded: boolean;
  isDragging: boolean;
  splitPosition: number;
  birthData: BirthChartData;
  onNewChart: () => void;
  onToggleExpand: () => void;
  onDragStart: () => void;
  onDrag: (e: React.MouseEvent) => void;
  onDragEnd: () => void;
}
