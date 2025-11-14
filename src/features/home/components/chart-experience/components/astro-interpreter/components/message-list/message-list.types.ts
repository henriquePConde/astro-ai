export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface MessageListViewProps {
  messages: ChatMessage[];
  isLoading: boolean;
}
