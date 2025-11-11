// src/features/home/components/chart-experience/section-content.types.ts
import type { ChartData, BirthChartData } from '@/features/home/types/chart.types';

export interface SectionContentViewProps {
  activeSection: string;
  chartData: ChartData | null;
  birthData: BirthChartData | null;
  reportData?: Record<string, string>;
  isGenerating: boolean;
  error: string | null;
  onGenerateReport: () => void;
  onDownloadPdf: () => void;
}
