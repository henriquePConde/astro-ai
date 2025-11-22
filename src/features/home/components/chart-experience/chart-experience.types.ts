import type { ChartData, BirthChartData } from '@/features/home/types/chart.types';
import type { ChartData as ApiChartData } from '@/features/chart/services/chart.service';

export interface ChartExperienceProps {
  chart: {
    chartData: ApiChartData | null;
    transformedChartData: ChartData | null;
    birthData: BirthChartData | null;
    error: string | null;
    loading: boolean;
    handleFormSubmit: (data: any) => Promise<void>;
    handleNewChart: () => void;
  };
  layout: {
    isDragging: boolean;
    splitPosition: number;
    handleDragStart: () => void;
    handleDrag: (e: React.MouseEvent) => void;
    handleDragEnd: () => void;
  };
  section: {
    currentSection: number;
    introFinished: boolean;
  };
  newChartLoading?: boolean;
  onNewChart: () => void;
  initialReport?: {
    id: string;
    content: Record<string, string>;
    createdAt: Date;
  };
  initialMessages?: Array<{ role: 'user' | 'assistant'; content: string }>;
  chartId?: string;
}
