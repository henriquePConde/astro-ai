'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { usePdfPreviewPage } from './hooks/usePdfPreviewPage';
import { PDFPreview } from '@/shared/components/pdf-preview';
import { styles } from './page.styles';

export default function PublicPDFPreviewPage() {
  const theme = useTheme();
  const { reportSections, chartData, error, isLoading } = usePdfPreviewPage();

  if (isLoading) {
    return (
      <Box sx={styles.centerPage()(theme)}>
        <Box sx={styles.textCenter()(theme)}>
          <Typography variant="body1" color="text.secondary">
            Loading PDF preview...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.centerPage()(theme)}>
        <Box sx={styles.textCenter()(theme)}>
          <Typography variant="h6" sx={styles.title()(theme)}>
            Error
          </Typography>
          <Typography variant="body2" sx={styles.subtitle()(theme)}>
            {error}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!reportSections) {
    return (
      <Box sx={styles.centerPage()(theme)}>
        <Box sx={styles.textCenter()(theme)}>
          <Typography variant="h6" sx={styles.title()(theme)}>
            No Report Data Available
          </Typography>
          <Typography variant="body2" sx={styles.subtitle()(theme)}>
            Please generate a report first.
          </Typography>
        </Box>
      </Box>
    );
  }

  // Important: explicit ready attribute that puppeteer waits for
  // Also add a stable className so service-side print CSS can target it if needed.
  return (
    <Box
      className="pdf-preview-container"
      sx={styles.previewContainer()(theme)}
      data-pdf-ready="true"
    >
      <PDFPreview isPublic={true} reportData={reportSections} chartData={chartData} />
    </Box>
  );
}
