'use client';

import React from 'react';
import { Box } from '@mui/material';
import { MessageBubble } from '../message-bubble';
import { LoadingIndicator } from '../loading-indicator';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        mb: 1,
        pr: 0.5,
        '&::-webkit-scrollbar': {
          width: 6,
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(138, 43, 226, 0.35)',
          borderRadius: 4,
        },
      }}
    >
      {messages.map((m, i) => (
        <MessageBubble key={i} role={m.role} content={m.content} />
      ))}

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <LoadingIndicator />
        </Box>
      )}
    </Box>
  );
};
