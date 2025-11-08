import type { ChartData } from '../../services/chart.service';

export interface ChartApplicationViewProps {
  chartData: ChartData;
  isExpanded: boolean;
  isDragging: boolean;
  splitPosition: number;
  onToggleExpand: () => void;
  onNewChart: () => void;
  onDragStart: () => void;
  onDrag: (e: React.MouseEvent) => void;
  onDragEnd: () => void;
}
