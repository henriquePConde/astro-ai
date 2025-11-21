'use client';

import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { MessageList } from './components/message-list/message-list';
import { InputForm } from './components/input-form';
import { styles } from './astro-interpreter.styles';
import { SuggestedQuestions } from './components/suggested-questions/suggested-questions';
import { useUsageColor } from '@/shared/hooks/use-usage-color';
import type { AstroInterpreterViewProps } from './astro-interpreter.types';

export function AstroInterpreterView({
  messages,
  isLoading,
  input,
  onInputChange,
  onSubmit,
  usage,
  suggestedQuestions,
  onSuggestedQuestionClick,
  suggestionsTitle,
  suggestionsSubtitle,
}: AstroInterpreterViewProps) {
  const isMessageLimitReached = usage ? usage.messages.used >= usage.messages.limit : false;
  const [suggestionsVisible, setSuggestionsVisible] = useState(true);
  const canToggleSuggestions = !isMessageLimitReached && suggestedQuestions.length > 0;
  const showSuggestionsPanel = canToggleSuggestions && suggestionsVisible;

  const getMessagesUsageColor = useUsageColor(
    usage?.messages.used ?? 0,
    usage?.messages.limit ?? 0,
  );

  return (
    <Box sx={styles.container()}>
      {usage && (
        <Box
          sx={{
            px: 2,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: getMessagesUsageColor }}>
            Messages: {usage.messages.used}/{usage.messages.limit} used today
          </Typography>
          {canToggleSuggestions && (
            <>
              {showSuggestionsPanel ? (
                <Button
                  size="small"
                  variant="text"
                  color="inherit"
                  onClick={() => setSuggestionsVisible(false)}
                >
                  Hide suggested questions
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="text"
                  color="inherit"
                  onClick={() => setSuggestionsVisible(true)}
                  startIcon={<LightbulbOutlinedIcon fontSize="small" />}
                >
                  Show suggested questions
                </Button>
              )}
            </>
          )}
        </Box>
      )}
      <MessageList messages={messages} isLoading={isLoading} />
      {showSuggestionsPanel && (
        <SuggestedQuestions
          config={{
            title: suggestionsTitle,
            subtitle: suggestionsSubtitle,
            questions: suggestedQuestions,
          }}
          onSelect={(question) => {
            onSuggestedQuestionClick(question);
            setSuggestionsVisible(false);
          }}
          disabled={isMessageLimitReached}
          onClose={() => setSuggestionsVisible(false)}
        />
      )}
      <InputForm
        input={input}
        onChange={onInputChange}
        onSubmit={onSubmit}
        disabled={isLoading || isMessageLimitReached}
      />
    </Box>
  );
}
