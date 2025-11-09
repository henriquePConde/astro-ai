'use client';

import { Box, Button, Typography, Alert, Stack } from '@mui/material';
import type { BirthChartReportViewProps } from './birth-chart-report.types';
import { ReportAccordion } from '../report-accordion/report-accordion.view';

export function BirthChartReportView({
  birthData,
  isGenerating,
  error,
  sections,
  onGenerate,
}: BirthChartReportViewProps) {
  const hasSections = sections && Object.keys(sections).length > 0;

  const handleClick = () => {
    if (!birthData || isGenerating) return;
    onGenerate();
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
        <Button variant="contained" onClick={handleClick} disabled={!birthData || isGenerating}>
          {isGenerating ? 'Generating…' : hasSections ? 'Regenerate' : 'Generate'}
        </Button>
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
