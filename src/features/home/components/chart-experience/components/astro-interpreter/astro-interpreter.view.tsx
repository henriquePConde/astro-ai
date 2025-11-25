'use client';

import { useState } from 'react';
import { Box, Button, Typography, Tooltip, IconButton } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import InfoIcon from '@mui/icons-material/Info';
import { MessageList } from './components/message-list/message-list';
import { InputForm } from './components/input-form';
import { styles } from './astro-interpreter.styles';
import { SuggestedQuestions } from './components/suggested-questions/suggested-questions';
import { useUsageColor } from '@/shared/hooks/use-usage-color';
import { useTimeUntilReset } from '@/shared/hooks/use-time-until-reset';
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
  tooltipLimitReached,
  isInputHighlighted = false,
}: AstroInterpreterViewProps) {
  const isMessageLimitReached = usage ? usage.messages.used >= usage.messages.limit : false;
  const timeRemaining = useTimeUntilReset(usage?.messages.firstGenerationAt);
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" sx={{ color: getMessagesUsageColor }}>
              Messages: {usage.messages.used}/{usage.messages.limit} used today
            </Typography>
            {isMessageLimitReached && (
              <Tooltip
                title={tooltipLimitReached(timeRemaining)}
                slotProps={{
                  tooltip: {
                    sx: {
                      fontSize: '0.95rem',
                    },
                  },
                }}
              >
                <IconButton size="small" sx={{ p: 0.25 }}>
                  <InfoIcon fontSize="small" sx={{ color: getMessagesUsageColor }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
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
        isHighlighted={isInputHighlighted}
      />
    </Box>
  );
}
