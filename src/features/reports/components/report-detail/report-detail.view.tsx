'use client';

import { Box, Typography, CircularProgress, Alert, Button, useTheme } from '@mui/material';
import { GeneratePdfControls } from '../generate-pdf/generate-pdf.container';
import { styles } from './report-detail.styles';
import type { ReportDetailViewProps } from './report-detail.types';

export function ReportDetailView({
  reportId,
  data,
  loading,
  error,
  config,
}: ReportDetailViewProps) {
  const theme = useTheme();

  return (
    <Box sx={styles.root()(theme)}>
      <Box sx={styles.headerContainer()(theme)}>
        <Typography
          component={config.ui.title.component}
          sx={styles.title(config.ui.title.fontSize, config.ui.title.fontWeight)(theme)}
        >
          {config.copy.title}
        </Typography>
        <Typography
          component={config.ui.subtitle.component}
          sx={styles.subtitle(config.ui.subtitle.fontSize)(theme)}
        >
          {config.copy.subtitle}
        </Typography>
      </Box>
      {loading && (
        <Box sx={styles.loadingContainer()(theme)}>
          <CircularProgress size={config.ui.loading.spinnerSize} />
          <Typography>{config.copy.loading}</Typography>
        </Box>
      )}
      {error && (
        <Alert severity={config.ui.alert.severity}>{error.message || config.copy.error}</Alert>
      )}
      {data && (
        <Box sx={styles.reportCard()(theme)}>
          <Box sx={styles.reportCardOverlay()(theme)} />
          <Box sx={styles.reportContent()(theme)}>
            <Typography variant={config.ui.section.variant} gutterBottom>
              {config.copy.section.introduction}
            </Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: String((data as any)?.content?.introduction ?? ''),
              }}
            />
            <Box sx={styles.actionsContainer()(theme)}>
              <Button variant={config.ui.button.variant} href={config.routes.pdfPreview(reportId)}>
                {config.copy.button.openPdfPreview}
              </Button>
              <GeneratePdfControls reportId={reportId} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
