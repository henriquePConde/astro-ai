'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { styles } from './report-accordion.styles';
import { useAccordionSectionHeight } from './hooks/use-accordion-section-height.state';
import type { ReportAccordionViewProps } from './report-accordion.types';

function AccordionSection({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  const theme = useTheme();
  const { height, ref } = useAccordionSectionHeight({ isOpen, children });

  return (
    <Box sx={styles.accordionSection(isOpen, height)(theme)} aria-hidden={!isOpen}>
      <Box ref={ref}>{children}</Box>
    </Box>
  );
}

export function ReportAccordionView({
  sections,
  isGenerating,
  hasBirthData,
  hasContent,
  sectionKeys,
  openSections,
  onToggleSection,
  config,
}: ReportAccordionViewProps) {
  const theme = useTheme();

  if (isGenerating && !hasContent) {
    return <Box sx={styles.generatingBox()(theme)}>{config.copy.generating}</Box>;
  }

  if (!hasBirthData && !isGenerating) {
    return <Box sx={styles.noBirthDataBox()(theme)}>{config.copy.noBirthData}</Box>;
  }

  if (!hasContent) return null;

  return (
    <Box sx={styles.container()(theme)}>
      {sectionKeys.map((key) => (
        <Box key={key} sx={styles.sectionItem()(theme)}>
          <Box
            component="button"
            type="button"
            onClick={() => onToggleSection(key)}
            sx={styles.sectionButton()(theme)}
          >
            <span>
              {config.copy.sectionLabels[key as keyof typeof config.copy.sectionLabels] || key}
            </span>
            <span style={styles.icon(!!openSections[key])}>{config.ui.accordion.icon}</span>
          </Box>

          <AccordionSection isOpen={!!openSections[key]}>
            <Typography sx={styles.sectionContent()(theme)}>{sections[key]}</Typography>
          </AccordionSection>
        </Box>
      ))}
    </Box>
  );
}
