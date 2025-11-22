'use client';

import { useEffect, useState } from 'react';
import type { ChatMessage } from '../components/message-list/message-list';

export const useAstroChat = (
  initialMessages?: Array<{ role: 'user' | 'assistant'; content: string }>,
) => {
  const [messages, setMessages] = useState<ChatMessage[]>(
    () =>
      initialMessages?.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })) || [],
  );
  const [isLoading, setIsLoading] = useState(false);

  // Keep local chat state in sync when initialMessages change (e.g. when
  // reopening a saved chart from \"My charts\" after new messages were
  // persisted on the backend).
  useEffect(() => {
    if (!initialMessages) return;
    setMessages(
      initialMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    );
  }, [initialMessages]);

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
