import type { BirthChartData } from '@/features/home/types/chart.types';

export interface BirthChartReportViewProps {
  birthData: BirthChartData | null;
  isGenerating: boolean;
  error: string | null;
  sections: Record<string, string>;
  onGenerate: () => void;
}
