'use client';

import { Box, Button, Typography, Alert, Stack, useTheme } from '@mui/material';
import { styles } from './birth-chart-report.styles';
import type { BirthChartReportViewProps } from './birth-chart-report.types';
import { ReportAccordionContainer } from '../report-accordion/report-accordion.container';

export function BirthChartReportView({
  birthData,
  isGenerating,
  error,
  sections,
  hasSections,
  handleGenerateClick,
  handleDownloadClick,
  generateButtonText,
  config,
}: BirthChartReportViewProps) {
  const theme = useTheme();

  return (
    <Box sx={styles.container(config.ui.container.maxWidth)(theme)}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Box>
          <Typography variant="h6">{config.copy.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {config.copy.description}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant={config.ui.button.generate.variant}
            onClick={handleGenerateClick}
            disabled={!birthData || isGenerating}
          >
            {generateButtonText}
          </Button>

          <Button
            variant={config.ui.button.download.variant}
            onClick={handleDownloadClick}
            disabled={!hasSections || isGenerating}
          >
            {config.copy.button.downloadPdf}
          </Button>
        </Stack>
      </Stack>

      {error && <Alert severity={config.ui.alert.severity}>{error}</Alert>}

      <ReportAccordionContainer
        sections={sections}
        isGenerating={isGenerating}
        hasBirthData={!!birthData}
        hasContent={hasSections}
      />
    </Box>
  );
}
