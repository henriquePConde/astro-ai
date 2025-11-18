'use client';

import React from 'react';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styles } from './suggested-questions.styles';
import type { SuggestedQuestionsViewProps } from './suggested-questions.types';

export function SuggestedQuestionsView({
  config,
  onSelect,
  disabled,
  onClose,
}: SuggestedQuestionsViewProps) {
  const theme = useTheme();
  const { title, subtitle, questions } = config;

  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <Box sx={styles.root()(theme)}>
      <Box sx={styles.header()(theme)}>
        <Box sx={styles.headerText()(theme)}>
          <Typography variant="body1" sx={styles.title()(theme)}>
            {title}
          </Typography>
          {subtitle && (
            <Typography component="p" sx={styles.subtitle()(theme)}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {onClose && (
          <IconButton
            size="small"
            onClick={onClose}
            aria-label="Hide suggested questions"
            edge="end"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Box sx={styles.chipsContainer()(theme)}>
        {questions.map((question) => (
          <Button
            key={question}
            size="small"
            variant="contained"
            sx={styles.chip(!!disabled)(theme)}
            onClick={() => onSelect(question)}
            disabled={disabled}
            aria-label={`Ask: ${question}`}
          >
            {question}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
