'use client';

import { Box, Button, Typography, Alert, Stack } from '@mui/material';
import type { BirthChartReportViewProps } from './birth-chart-report.types';
import { ReportAccordion } from '../report-accordion/report-accordion.view';

export function BirthChartReportView({
  birthData,
  isGenerating,
  error,
  sections,
  hasSections,
  onGenerate,
  onDownloadPdf,
}: BirthChartReportViewProps) {
  const handleGenerateClick = () => {
    if (!birthData || isGenerating) return;
    onGenerate();
  };

  const handleDownloadClick = () => {
    if (!hasSections || isGenerating) return;
    onDownloadPdf();
  };

  return (
    <Box
      sx={(theme) => ({
        maxWidth: 800,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
      })}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Box>
          <Typography variant="h6">Personalized Birth Chart Report</Typography>
          <Typography variant="body2" color="text.secondary">
            Generate an AI-written, structured report based on your birth data.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="contained"
            onClick={handleGenerateClick}
            disabled={!birthData || isGenerating}
          >
            {isGenerating ? 'Generating…' : hasSections ? 'Regenerate report' : 'Generate report'}
          </Button>

          <Button
            variant="outlined"
            onClick={handleDownloadClick}
            disabled={!hasSections || isGenerating}
          >
            Download PDF
          </Button>
        </Stack>
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}

      <ReportAccordion
        sections={sections}
        isGenerating={isGenerating}
        hasBirthData={!!birthData}
        hasContent={hasSections}
      />
    </Box>
  );
}
