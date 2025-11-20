'use client';

import {
  Box,
  Button,
  Typography,
  Alert,
  Stack,
  useTheme,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { styles } from './birth-chart-report.styles';
import type { BirthChartReportViewProps } from './birth-chart-report.types';
import { ReportAccordionContainer } from '../report-accordion/report-accordion.container';
import { useTimeUntilReset } from '@/shared/hooks/use-time-until-reset';

export function BirthChartReportView({
  birthData,
  isGenerating,
  isDownloading,
  error,
  sections,
  hasSections,
  handleGenerateClick,
  handleDownloadClick,
  generateButtonText,
  usage,
  config,
  jobProgress,
  onGoToAI,
}: BirthChartReportViewProps) {
  const theme = useTheme();
  const isReportLimitReached = usage ? usage.reports.used >= usage.reports.limit : false;
  const timeRemaining = useTimeUntilReset(usage?.reports.firstGenerationAt);

  return (
    <Box sx={styles.container(config.ui.container.maxWidth)(theme)}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Box>
          <Typography variant="h6">{config.copy.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {config.copy.description}
          </Typography>
          {usage && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Reports: {usage.reports.used}/{usage.reports.limit} used today
            </Typography>
          )}
        </Box>

        <Stack direction="row" spacing={1.5}>
          {isReportLimitReached ? (
            <Tooltip
              title={config.copy.button.tooltipLimitReached(timeRemaining)}
              slotProps={{
                tooltip: {
                  sx: {
                    fontSize: '0.95rem',
                  },
                },
              }}
            >
              <span>
                <Button
                  variant={config.ui.button.generate.variant}
                  onClick={handleGenerateClick}
                  disabled={!birthData || isGenerating || isDownloading || isReportLimitReached}
                  sx={styles.generateButton()(theme)}
                >
                  <Box sx={styles.generateContentWrapper()(theme)}>
                    <Box sx={{ visibility: isGenerating ? 'hidden' : 'visible' }}>
                      {generateButtonText}
                    </Box>
                  </Box>
                  {isGenerating && (
                    <Box sx={styles.generateSpinnerOverlay()(theme)}>
                      <CircularProgress size={20} />
                    </Box>
                  )}
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Button
              variant={config.ui.button.generate.variant}
              onClick={handleGenerateClick}
              disabled={!birthData || isGenerating || isDownloading || isReportLimitReached}
              sx={styles.generateButton()(theme)}
            >
              <Box sx={styles.generateContentWrapper()(theme)}>
                <Box sx={{ visibility: isGenerating ? 'hidden' : 'visible' }}>
                  {generateButtonText}
                </Box>
              </Box>
              {isGenerating && (
                <Box sx={styles.generateSpinnerOverlay()(theme)}>
                  <CircularProgress size={20} />
                </Box>
              )}
            </Button>
          )}

          <Button
            variant={config.ui.button.download.variant}
            onClick={handleDownloadClick}
            disabled={!hasSections || isGenerating || isDownloading}
            sx={styles.downloadButton()(theme)}
          >
            <Box sx={styles.downloadContentWrapper()(theme)}>
              <Box sx={{ visibility: isDownloading ? 'hidden' : 'visible' }}>
                {config.copy.button.downloadPdf}
              </Box>
            </Box>
            {isDownloading && (
              <Box sx={styles.downloadSpinnerOverlay()(theme)}>
                <CircularProgress size={20} />
              </Box>
            )}
          </Button>
        </Stack>
      </Stack>

      {error && <Alert severity={config.ui.alert.severity}>{error}</Alert>}

      <ReportAccordionContainer
        sections={sections}
        isGenerating={isGenerating}
        isDownloading={isDownloading}
        hasBirthData={!!birthData}
        hasContent={hasSections}
        jobProgress={jobProgress}
        onGoToAI={onGoToAI}
      />
    </Box>
  );
}
