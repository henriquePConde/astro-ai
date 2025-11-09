'use client';

import React from 'react';
import { Box, Button, TextField } from '@mui/material';

interface InputFormProps {
  input: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ input, onChange, onSubmit, disabled }) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 'auto' }}>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <TextField
          fullWidth
          size="small"
          value={input}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask about your chart..."
          disabled={disabled}
          InputProps={{
            sx: {
              bgcolor: 'rgba(13,12,34,0.8)',
              borderRadius: 2,
              color: 'rgba(255,255,255,0.9)',
              fontFamily: 'mystical, serif',
              px: 1.5,
              '&::placeholder': {
                color: 'rgba(255,255,255,0.5)',
              },
            },
          }}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255,255,255,0.12)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(138,43,226,0.6)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(138,43,226,0.8)',
            },
          }}
        />
        <Button
          type="submit"
          disabled={disabled || !input.trim()}
          sx={{
            px: 3,
            borderRadius: 2,
            fontFamily: 'mystical, serif',
            textTransform: 'none',
            bgcolor: disabled ? 'rgba(138,43,226,0.15)' : 'rgba(138,43,226,0.4)',
            color: disabled ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.95)',
            border: '1px solid rgba(255,255,255,0.16)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.25s',
            '&:hover': !disabled
              ? {
                  bgcolor: 'rgba(138,43,226,0.7)',
                  boxShadow: '0 0 18px rgba(138,43,226,0.45)',
                }
              : {},
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};
