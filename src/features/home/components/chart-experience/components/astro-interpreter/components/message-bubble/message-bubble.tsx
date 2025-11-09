'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      <Box
        sx={{
          maxWidth: '80%',
          borderRadius: 2,
          p: 1.5,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.06)',
          fontFamily: 'mystical, serif',
          fontSize: 13,
          lineHeight: 1.5,
          bgcolor: isUser ? 'rgba(138,43,226,0.35)' : 'rgba(13,12,34,0.8)',
          color: isUser ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)',
          boxShadow: isUser ? '0 0 16px rgba(138,43,226,0.35)' : '0 0 16px rgba(0,0,0,0.6)',
        }}
      >
        {isUser ? (
          content
        ) : (
          <Box className="markdown prose prose-invert" sx={{ '& p': { m: 0, mb: 0.5 } }}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </Box>
        )}
      </Box>
    </Box>
  );
};
