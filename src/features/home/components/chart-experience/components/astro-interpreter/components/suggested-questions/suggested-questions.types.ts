export interface SuggestedQuestionsConfig {
  title: string;
  subtitle?: string;
  questions: readonly string[];
}

export interface SuggestedQuestionsViewProps {
  config: SuggestedQuestionsConfig;
  onSelect: (question: string) => void;
  disabled?: boolean;
  onClose?: () => void;
}
