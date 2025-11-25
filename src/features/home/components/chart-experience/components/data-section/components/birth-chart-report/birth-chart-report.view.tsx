'use client';

import {
  Box,
  Button,
  Typography,
  Alert,
  Stack,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Tooltip,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import { styles } from './birth-chart-report.styles';
import type { BirthChartReportViewProps } from './birth-chart-report.types';
import { ReportAccordionContainer } from '../report-accordion/report-accordion.container';
import { AccordionSection } from '@/shared/components/accordion-section/accordion-section.view';
import { useTimeUntilReset } from '@/shared/hooks/use-time-until-reset';
import { useUsageColor } from '@/shared/hooks/use-usage-color';

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
  const isDesktopLayout = useMediaQuery(theme.breakpoints.up('lg'));
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const isReportLimitReached = usage ? usage.reports.used >= usage.reports.limit : false;
  const timeRemaining = useTimeUntilReset(usage?.reports.firstGenerationAt);
  const getReportsUsageColor = useUsageColor(usage?.reports.used ?? 0, usage?.reports.limit ?? 0);

  // Render desktop layout
  if (isDesktopLayout) {
    return (
      <Box sx={styles.container(config.ui.container.maxWidth)(theme)}>
        <Box sx={styles.stickyHeader()(theme)}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            spacing={2}
          >
            <Box>
              <Typography variant="h6">{config.copy.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {config.copy.description}
              </Typography>
              {usage && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                  <Typography variant="body2" sx={{ color: getReportsUsageColor }}>
                    Reports: {usage.reports.used}/{usage.reports.limit} used today
                  </Typography>
                  {isReportLimitReached && (
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
                      <IconButton size="small" sx={{ p: 0.25 }}>
                        <InfoIcon fontSize="small" sx={{ color: getReportsUsageColor }} />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
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

          {error && (
            <Alert severity={config.ui.alert.severity} sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>

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

  // Render mobile/tablet accordion layout
  return (
    <Box sx={styles.container(config.ui.container.maxWidth)(theme)}>
      {/* Mobile accordion for report generation */}
      <Box sx={styles.mobileAccordion()(theme)}>
        <Box
          component="button"
          type="button"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          sx={styles.mobileAccordionHeader()(theme)}
        >
          <span>{config.copy.title}</span>
          <span style={styles.mobileAccordionIcon(isAccordionOpen)}>{'>'}</span>
        </Box>
        <AccordionSection isOpen={isAccordionOpen}>
          <Box sx={styles.mobileAccordionContent()(theme)}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {config.copy.description}
            </Typography>

            {usage && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                <Typography variant="body2" sx={{ color: getReportsUsageColor }}>
                  Reports: {usage.reports.used}/{usage.reports.limit} used today
                </Typography>
                {isReportLimitReached && (
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
                    <IconButton size="small" sx={{ p: 0.25 }}>
                      <InfoIcon fontSize="small" sx={{ color: getReportsUsageColor }} />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            )}

            <Stack direction="column" spacing={1.5}>
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
                      sx={styles.mobileGenerateButton()(theme)}
                      fullWidth
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
                  sx={styles.mobileGenerateButton()(theme)}
                  fullWidth
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
                sx={styles.mobileDownloadButton()(theme)}
                fullWidth
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

            {error && (
              <Alert severity={config.ui.alert.severity} sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
        </AccordionSection>
      </Box>

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
