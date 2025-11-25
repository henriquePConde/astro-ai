import type { ChartData as HomeChartData } from '@/features/home/types/chart.types';
import type { DailyUsage } from '@/features/reports/services/reports.service';

type AstroChatMessage = { role: 'user' | 'assistant'; content: string };

export interface AstroInterpreterContainerProps {
  chartData: HomeChartData;
  initialMessages?: AstroChatMessage[];
  chartId?: string;
}

export interface AstroInterpreterViewProps {
  messages: AstroChatMessage[];
  isLoading: boolean;
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  usage?: DailyUsage;
  suggestedQuestions: readonly string[];
  onSuggestedQuestionClick: (question: string) => void;
  suggestionsTitle: string;
  suggestionsSubtitle?: string;
  tooltipLimitReached: (timeRemaining: string) => string;
  isInputHighlighted?: boolean;
}
