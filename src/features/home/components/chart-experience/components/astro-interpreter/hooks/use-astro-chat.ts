'use client';

import { useState } from 'react';
import type { ChatMessage } from '../components/message-list/message-list';

export const useAstroChat = (
  initialMessages?: Array<{ role: 'user' | 'assistant'; content: string }>,
) => {
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessages?.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })) || [],
  );
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
