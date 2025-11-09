'use client';

import React from 'react';
import { Box } from '@mui/material';

export const LoadingIndicator: React.FC = () => {
  return (
    <Box
      sx={{
        maxWidth: '80%',
        borderRadius: 2,
        p: 1.5,
        bgcolor: 'rgba(13,12,34,0.8)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box sx={{ display: 'flex', gap: 0.75 }}>
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: '999px',
            bgcolor: 'rgba(255,255,255,0.5)',
            animation: 'bounce 1s infinite',
          }}
        />
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: '999px',
            bgcolor: 'rgba(255,255,255,0.5)',
            animation: 'bounce 1s infinite',
            animationDelay: '0.15s',
          }}
        />
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: '999px',
            bgcolor: 'rgba(255,255,255,0.5)',
            animation: 'bounce 1s infinite',
            animationDelay: '0.3s',
          }}
        />
      </Box>
      <style jsx>{`
        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0.8);
            opacity: 0.4;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};
