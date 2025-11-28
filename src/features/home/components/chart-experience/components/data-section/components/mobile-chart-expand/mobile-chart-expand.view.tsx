'use client';

import { Box, Typography, useTheme, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createPortal } from 'react-dom';
import type { MobileChartExpandViewProps } from './mobile-chart-expand.types';
import { styles } from './mobile-chart-expand.styles';
import { ChartSectionContainer } from '../../../chart-section/chart-section.container';
import { AccordionSection } from '@/shared/components/accordion-section/accordion-section.view';

export function MobileChartExpandView({
  isExpanded,
  onClose,
  chartData,
  birthData,
  config,
  hintConfig,
  interactionsOpen,
  onToggleInteractions,
  chartKey,
}: MobileChartExpandViewProps) {
  const theme = useTheme();

  if (!isExpanded || typeof window === 'undefined') return null;

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
            onClick={onToggleInteractions}
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
            key={`mobile-expand-chart-${chartKey}`}
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
