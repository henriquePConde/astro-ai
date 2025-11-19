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

type LoadingVariant = 'generate' | 'download';

interface LoadingPanelProps {
  variant: LoadingVariant;
  title: string;
  subtitle: string;
  ctaLabel: string;
  jobProgress: number | null;
  onGoToAI: () => void;
}

function ReportLoadingPanel({
  variant,
  title,
  subtitle,
  ctaLabel,
  jobProgress,
  onGoToAI,
}: LoadingPanelProps) {
  const theme = useTheme();
  const percent = jobProgress != null ? Math.round(jobProgress * 100) : null;

  return (
    <Box sx={styles.generatingBox()(theme)}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
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
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={onGoToAI}
          sx={styles.generatingCtaButton()(theme)}
        >
          {ctaLabel}
        </Button>
      </Box>
    </Box>
  );
}

export function ReportAccordionView({
  sections,
  isGenerating,
  isDownloading,
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
    return (
      <ReportLoadingPanel
        variant="generate"
        title={config.copy.generatingTitle}
        subtitle={config.copy.generatingSubtitle}
        ctaLabel={config.copy.generatingCta}
        jobProgress={jobProgress}
        onGoToAI={onGoToAI}
      />
    );
  }

  if (!hasBirthData && !isGenerating && !isDownloading) {
    return <Box sx={styles.noBirthDataBox()(theme)}>{config.copy.noBirthData}</Box>;
  }

  if (!hasContent) return null;

  return (
    <Box sx={styles.container()(theme)}>
      {isDownloading && (
        <Box sx={{ mb: 2 }}>
          <ReportLoadingPanel
            variant="download"
            title={config.copy.downloadingTitle}
            subtitle={config.copy.downloadingSubtitle}
            ctaLabel={config.copy.downloadingCta}
            jobProgress={null}
            onGoToAI={onGoToAI}
          />
        </Box>
      )}
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
