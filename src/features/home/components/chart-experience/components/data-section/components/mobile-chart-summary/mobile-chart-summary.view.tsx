'use client';

import { Box, Button, Typography, useTheme } from '@mui/material';
import type { MobileChartSummaryViewProps } from './mobile-chart-summary.types';
import { styles } from './mobile-chart-summary.styles';
import { AccordionSection } from '@/shared/components/accordion-section/accordion-section.view';

/**
 * Mobile/tablet-only summary header that shows:
 * - Birth info
 * - Big three badge
 * - Static (non-closable) chart interactions hint
 *
 * Placed between the data section tabs and the chart section when
 * viewing the "Natal Chart" tab on small screens.
 */
export function MobileChartSummaryView({
  displayName,
  location,
  dateStr,
  timeStr,
  sunSign,
  moonSign,
  ascendantSign,
  onExpandChart,
  onAskAI,
  config,
  birthInfoConfig,
  bigThreeConfig,
  openSections,
  onToggleSection,
  birthMetaColors,
  bigThreeColors,
  hintLineColor,
}: MobileChartSummaryViewProps) {
  const theme = useTheme();

  return (
    <Box sx={styles.root()(theme)}>
      {/* Birth Info accordion */}
      <Box sx={styles.item()(theme)}>
        <Box
          component="button"
          type="button"
          onClick={() => onToggleSection('birth')}
          sx={styles.sectionHeader()(theme)}
        >
          <span>{config.copy.birthInfoTitle}</span>
          <span style={styles.icon(openSections.birth)}>{'>'}</span>
        </Box>
        <AccordionSection isOpen={openSections.birth}>
          <Box sx={styles.sectionContent()(theme)}>
            <Typography component="div" sx={styles.birthTitle()(theme)}>
              {displayName}
            </Typography>
            {location && (
              <Typography component="div" sx={styles.birthMeta(birthMetaColors[0])(theme)}>
                {location}
              </Typography>
            )}
            <Typography component="div" sx={styles.birthMeta(birthMetaColors[1])(theme)}>
              {dateStr}
            </Typography>
            <Typography component="div" sx={styles.birthMeta(birthMetaColors[2])(theme)}>
              {timeStr}
            </Typography>
          </Box>
        </AccordionSection>
      </Box>

      {/* Astrological Info accordion */}
      {sunSign && moonSign && ascendantSign && (
        <Box sx={styles.item()(theme)}>
          <Box
            component="button"
            type="button"
            onClick={() => onToggleSection('astro')}
            sx={styles.sectionHeader()(theme)}
          >
            <span>{config.copy.astrologicalInfoTitle}</span>
            <span style={styles.icon(openSections.astro)}>{'>'}</span>
          </Box>
          <AccordionSection isOpen={openSections.astro}>
            <Box sx={styles.sectionContent()(theme)}>
              <Typography component="div" sx={styles.bigThreeLine(bigThreeColors[0])(theme)}>
                {bigThreeConfig.copy.sun} {sunSign}
              </Typography>
              <Typography component="div" sx={styles.bigThreeLine(bigThreeColors[1])(theme)}>
                {bigThreeConfig.copy.moon} {moonSign}
              </Typography>
              <Typography component="div" sx={styles.bigThreeLine(bigThreeColors[2])(theme)}>
                {bigThreeConfig.copy.ascendant} {ascendantSign}
              </Typography>
              <Button onClick={onAskAI} variant="text" sx={styles.bigThreeButton()(theme)}>
                {bigThreeConfig.copy.button}
              </Button>
            </Box>
          </AccordionSection>
        </Box>
      )}

      {/* Expand Chart accordion */}
      {onExpandChart && (
        <Box sx={styles.item()(theme)}>
          <Box
            component="button"
            type="button"
            onClick={() => onToggleSection('expand')}
            sx={styles.sectionHeader()(theme)}
          >
            <span>{config.copy.expandChartTitle}</span>
            <span style={styles.icon(openSections.expand)}>{'>'}</span>
          </Box>
          <AccordionSection isOpen={openSections.expand}>
            <Box sx={styles.sectionContent()(theme)}>
              <Typography component="div" sx={styles.hintLine(hintLineColor)(theme)}>
                {config.copy.expandChartDescription}
              </Typography>
              <Button onClick={onExpandChart} variant="text" sx={styles.expandButton()(theme)}>
                {config.copy.expandChartButton}
              </Button>
            </Box>
          </AccordionSection>
        </Box>
      )}
    </Box>
  );
}
