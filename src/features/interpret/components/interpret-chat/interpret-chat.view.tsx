'use client';

import { Box, Button, Stack, TextField, Typography, CircularProgress } from '@mui/material';

export function InterpretChatView({
  message,
  setMessage,
  output,
  loading,
  onSend,
}: {
  message: string;
  setMessage: (v: string) => void;
  output: string;
  loading?: boolean;
  onSend: () => void;
}) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        AI Interpreter
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
        />
        <Button onClick={onSend} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={16} /> : 'Send'}
        </Button>
        <Box
          sx={{
            whiteSpace: 'pre-wrap',
            bgcolor: '#111',
            color: '#f1f1f1',
            p: 2,
            borderRadius: 1,
            minHeight: 160,
          }}
        >
          {output || 'The interpretation will appear here.'}
        </Box>
      </Stack>
    </Box>
  );
}
