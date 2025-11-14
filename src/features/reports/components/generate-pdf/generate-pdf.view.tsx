'use client';

import { Box, Button, MenuItem, Select, Typography, useTheme } from '@mui/material';
import { styles } from './generate-pdf.styles';
import type { GeneratePdfViewProps } from './generate-pdf.types';
import type { PDFPresetKey } from '@/shared/services/pdf/pdf.service';

export function GeneratePdfView({
  preset,
  onPresetChange,
  onGenerate,
  isLoading,
  config,
}: GeneratePdfViewProps) {
  const theme = useTheme();

  return (
    <Box sx={styles.root()(theme)}>
      <Box sx={styles.selectContainer()(theme)}>
        <Typography variant={config.ui.label.variant}>{config.copy.label.pdfQuality}</Typography>
        <Select
          size={config.ui.select.size}
          value={preset}
          onChange={(e) => onPresetChange(e.target.value as PDFPresetKey)}
        >
          {config.values.presetOptions.map((key) => (
            <MenuItem key={key} value={key}>
              {config.copy.presets[key]}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Button variant={config.ui.button.variant} onClick={onGenerate} disabled={isLoading}>
        {isLoading ? config.copy.button.generating : config.copy.button.generate}
      </Button>
    </Box>
  );
}
