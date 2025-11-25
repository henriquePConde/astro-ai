'use client';

import { Box, Button, Typography, useTheme, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import type { MobileChartExpandViewProps } from './mobile-chart-expand.types';
import { styles } from './mobile-chart-expand.styles';
import { CHART_INTERACTIONS_HINT_CONFIG } from '../../../chart-interactions-hint/chart-interactions-hint.config';
import { ChartSectionContainer } from '../../../chart-section/chart-section.container';
import { AccordionSection } from '@/shared/components/accordion-section/accordion-section.view';

export function MobileChartExpandView({
  isExpanded,
  onClose,
  chartData,
  birthData,
  config,
}: MobileChartExpandViewProps) {
  const theme = useTheme();
  const [interactionsOpen, setInteractionsOpen] = useState(true);

  if (!isExpanded || typeof window === 'undefined') return null;

  const hintConfig = CHART_INTERACTIONS_HINT_CONFIG;

  const overlayContent = (
    <Box sx={styles.overlay()(theme)}>
      <IconButton
        size="small"
        onClick={onClose}
        sx={styles.closeButton()(theme)}
        aria-label={config.copy.closeButton}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <Box sx={styles.content()(theme)}>
        {/* Chart Interactions accordion */}
        <Box sx={styles.interactionsAccordion()(theme)}>
          <Box
            component="button"
            type="button"
            onClick={() => setInteractionsOpen(!interactionsOpen)}
            sx={styles.accordionHeader()(theme)}
          >
            <span>{config.copy.chartInteractionsTitle}</span>
            <span style={styles.icon(interactionsOpen)}>{'>'}</span>
          </Box>
          <AccordionSection isOpen={interactionsOpen}>
            <Box sx={styles.accordionContent()(theme)}>
              <Typography component="div" sx={styles.hintTitle()(theme)}>
                {hintConfig.copy.title}
              </Typography>
              {hintConfig.copy.mobileDescriptionLines.map((line) => (
                <Typography key={line} component="div" sx={styles.hintLine()(theme)}>
                  {line}
                </Typography>
              ))}
            </Box>
          </AccordionSection>
        </Box>

        {/* Chart container */}
        <Box sx={styles.chartContainer()(theme)}>
          <ChartSectionContainer
            chartData={chartData}
            birthData={birthData}
            isExpanded={false}
            isDragging={false}
            splitPosition={50}
            enableMobileInteractions={true}
            enableZoomPan={true}
          />
        </Box>
      </Box>
    </Box>
  );

  return createPortal(overlayContent, document.body);
}
