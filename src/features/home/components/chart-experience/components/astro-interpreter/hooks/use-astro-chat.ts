'use client';

import { useState } from 'react';
import type { ChatMessage } from '../components/message-list/message-list';

export const useAstroChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  return {
    messages,
    setMessages,
    addMessage,
    isLoading,
    setIsLoading,
  };
};
