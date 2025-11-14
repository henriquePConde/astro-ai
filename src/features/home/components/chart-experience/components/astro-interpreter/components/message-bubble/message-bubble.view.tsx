'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';
import { styles } from './message-bubble.styles';
import type { MessageBubbleViewProps } from './message-bubble.types';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

export function MessageBubbleView({ role, content }: MessageBubbleViewProps) {
  const isUser = role === 'user';

  return (
    <Box sx={styles.container(isUser)}>
      <Box sx={styles.bubble(isUser)}>
        {isUser ? (
          content
        ) : (
          <Box className="markdown prose prose-invert" sx={styles.markdown()}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </Box>
        )}
      </Box>
    </Box>
  );
}
