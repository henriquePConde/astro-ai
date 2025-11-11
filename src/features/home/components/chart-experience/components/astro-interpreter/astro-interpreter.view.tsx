'use client';

import { Box } from '@mui/material';
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
}: AstroInterpreterViewProps) {
  return (
    <Box sx={styles.container()}>
      <MessageList messages={messages} isLoading={isLoading} />
      <InputForm input={input} onChange={onInputChange} onSubmit={onSubmit} disabled={isLoading} />
    </Box>
  );
}
