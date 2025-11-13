'use client';

import { Box, Typography } from '@mui/material';
import { MessageList } from './components/message-list/message-list';
import { InputForm } from './components/input-form';
import { styles } from './astro-interpreter.styles';
import type { AstroInterpreterViewProps } from './astro-interpreter.types';

export function AstroInterpreterView({
  messages,
  isLoading,
  input,
  onInputChange,
  onSubmit,
  usage,
}: AstroInterpreterViewProps) {
  const isMessageLimitReached = usage ? usage.messages.used >= usage.messages.limit : false;

  return (
    <Box sx={styles.container()}>
      {usage && (
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Messages: {usage.messages.used}/{usage.messages.limit} used today
          </Typography>
        </Box>
      )}
      <MessageList messages={messages} isLoading={isLoading} />
      <InputForm
        input={input}
        onChange={onInputChange}
        onSubmit={onSubmit}
        disabled={isLoading || isMessageLimitReached}
      />
    </Box>
  );
}
