'use client';

import React from 'react';
import { Box } from '@mui/material';
import { MessageBubble } from '../message-bubble';
import { LoadingIndicator } from '../loading-indicator';
import { styles } from './message-list.styles';
import type { MessageListViewProps } from './message-list.types';

export function MessageListView({ messages, isLoading }: MessageListViewProps) {
  return (
    <Box sx={styles.container()()}>
      {messages.map((m, i) => (
        <MessageBubble key={i} role={m.role} content={m.content} />
      ))}

      {isLoading && (
        <Box sx={styles.loadingContainer()()}>
          <LoadingIndicator />
        </Box>
      )}
    </Box>
  );
}
