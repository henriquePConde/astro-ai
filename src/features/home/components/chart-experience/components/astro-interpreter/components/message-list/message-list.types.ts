import type { DataSectionTab } from '@/features/home/components/chart-experience/components/data-section/data-section.types';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface MessageListViewProps {
  messages: ChatMessage[];
  isLoading: boolean;
  activeTab?: DataSectionTab;
}
