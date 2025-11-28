'use client';

import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { MessageBubble } from '../message-bubble';
import { LoadingIndicator } from '../loading-indicator';
import { styles } from './message-list.styles';
import type { MessageListViewProps } from './message-list.types';
import { useMessageListScroll } from './hooks/use-message-list-scroll.state';

export function MessageListView({ messages, isLoading, activeTab }: MessageListViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Use hook for scroll behavior logic
  useMessageListScroll(scrollContainerRef, messages, isLoading, activeTab);

  return (
    <Box ref={scrollContainerRef} sx={styles.container()}>
      {messages.map((m, i) => (
        <MessageBubble key={i} role={m.role} content={m.content} />
      ))}

      {isLoading && (
        <Box sx={styles.loadingContainer()}>
          <LoadingIndicator />
        </Box>
      )}
    </Box>
  );
}
