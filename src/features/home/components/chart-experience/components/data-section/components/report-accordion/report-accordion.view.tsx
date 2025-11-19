// astro-ai-fullstack/src/features/home/components/chart-experience/components/data-section/components/report-accordion/report-accordion.view.tsx

'use client';

import { Box, Button, LinearProgress, Typography, useTheme } from '@mui/material';
import { styles } from './report-accordion.styles';
import type { ReportAccordionViewProps } from './report-accordion.types';
import { MarkdownRenderer } from '@/shared/components/markdown-renderer';

function AccordionSection({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <Box sx={styles.accordionSection(isOpen)(theme)} aria-hidden={!isOpen}>
      {/* inner box gets full width; padding-bottom is in sectionContent */}
      <Box sx={{ width: '100%' }}>{children}</Box>
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
  jobProgress,
  onGoToAI,
}: ReportAccordionViewProps) {
  const theme = useTheme();

  if (isGenerating && !hasContent) {
    const percent = jobProgress != null ? Math.round(jobProgress * 100) : null;

    return (
      <Box sx={styles.generatingBox()(theme)}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {config.copy.generatingTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {config.copy.generatingSubtitle}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <LinearProgress
            variant={percent != null ? 'determinate' : 'indeterminate'}
            value={percent ?? undefined}
          />
          {percent != null && (
            <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
              {percent}% complete
            </Typography>
          )}
        </Box>
        <Box sx={{ mt: 1.5 }}>
          <Button size="small" variant="outlined" onClick={onGoToAI}>
            {config.copy.generatingCta}
          </Button>
        </Box>
      </Box>
    );
  }

  if (!hasBirthData && !isGenerating) {
    return <Box sx={styles.noBirthDataBox()(theme)}>{config.copy.noBirthData}</Box>;
  }

  if (!hasContent) return null;

  return (
    <Box sx={styles.container()(theme)}>
      {sectionKeys.map((key) => {
        const isOpen = !!openSections[key];

        return (
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
              <span style={styles.icon(isOpen)}>{config.ui.accordion.icon}</span>
            </Box>

            <AccordionSection isOpen={isOpen}>
              <Box sx={styles.sectionContent()(theme)}>
                <MarkdownRenderer content={sections[key]} colorMode="light" />
              </Box>
            </AccordionSection>
          </Box>
        );
      })}
    </Box>
  );
}
