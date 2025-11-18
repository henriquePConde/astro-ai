'use client';

import React from 'react';
import { Box, Button, TextField, useTheme } from '@mui/material';
import { styles } from './input-form.styles';
import type { InputFormViewProps } from './input-form.types';

export function InputFormView({ input, onChange, onSubmit, disabled }: InputFormViewProps) {
  const theme = useTheme();

  return (
    <Box component="form" onSubmit={onSubmit} sx={styles.form()(theme)}>
      <Box sx={styles.formContainer()(theme)}>
        <TextField
          fullWidth
          size="small"
          multiline
          maxRows={3}
          value={input}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask about your chart..."
          disabled={disabled}
          slotProps={{
            input: {
              sx: styles.textFieldInput()(theme),
            },
          }}
          variant="outlined"
          sx={styles.textField()(theme)}
        />
        <Button
          type="submit"
          disabled={disabled || !input.trim()}
          sx={styles.button(disabled)(theme)}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
