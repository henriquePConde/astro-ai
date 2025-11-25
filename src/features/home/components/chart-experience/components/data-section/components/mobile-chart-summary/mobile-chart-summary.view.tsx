'use client';

import { Box, Button, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import type { MobileChartSummaryViewProps } from './mobile-chart-summary.types';
import { styles } from './mobile-chart-summary.styles';
import { BIRTH_INFO_BADGE_CONFIG } from '../../../birth-info-badge/birth-info-badge.config';
import { BIG_THREE_BADGE_CONFIG } from '../../../big-three-badge/big-three-badge.config';
import { CHART_INTERACTIONS_HINT_CONFIG } from '../../../chart-interactions-hint/chart-interactions-hint.config';
import { useAIInput } from '../../../astro-interpreter/hooks/use-ai-input.state';
import { useDataSectionTabsContext } from '../../context/data-section-tabs.context';
import { DATA_SECTION_TABS } from '../../data-section.constants';
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
  chartData,
  birthData,
  onExpandChart,
}: MobileChartSummaryViewProps) {
  const theme = useTheme();
  const { setAIInput } = useAIInput();
  const tabsContext = useDataSectionTabsContext();

  const [openSections, setOpenSections] = useState<{
    birth: boolean;
    astro: boolean;
    controls: boolean;
    expand: boolean;
  }>({
    birth: false,
    astro: false,
    controls: true,
    expand: true,
  });

  const toggleSection = (key: 'birth' | 'astro' | 'controls' | 'expand') => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!chartData || !birthData) return null;

  const { name, city, nation, year, month, day, hour, minute } = birthData;

  const displayName = name?.trim() || BIRTH_INFO_BADGE_CONFIG.copy.nameFallback;
  const location = [city, nation].filter(Boolean).join(', ');

  const date = new Date(year, month - 1, day, hour, minute);
  const dateStr = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

  // Big three computation (duplicated from BigThreeBadgeContainer, but
  // rendered with mobile-friendly inline styles)
  const SIGNS = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces',
  ] as const;

  const sunPlanet = chartData.planets.find((p) => p.name.toLowerCase() === 'sun');
  const sunSign = sunPlanet ? SIGNS[sunPlanet.sign] : null;

  const moonPlanet = chartData.planets.find((p) => p.name.toLowerCase() === 'moon');
  const moonSign = moonPlanet ? SIGNS[moonPlanet.sign] : null;

  const ascendantLongitude = chartData.houses.firstHouse;
  const ascendantSignIndex = Math.floor(ascendantLongitude / 30) % 12;
  const ascendantSign = SIGNS[ascendantSignIndex];

  const handleAskAI = () => {
    if (tabsContext) {
      tabsContext.setActiveTab(DATA_SECTION_TABS.AI);
    }
    setAIInput('How does my sun, moon and ascendant playout together in my birth chart', true);
  };

  const hintConfig = CHART_INTERACTIONS_HINT_CONFIG;

  return (
    <Box sx={styles.root()(theme)}>
      {/* Birth Info accordion */}
      <Box sx={styles.item()(theme)}>
        <Box
          component="button"
          type="button"
          onClick={() => toggleSection('birth')}
          sx={styles.sectionHeader()(theme)}
        >
          <span>Birth Info</span>
          <span style={styles.icon(openSections.birth)}>{'>'}</span>
        </Box>
        <AccordionSection isOpen={openSections.birth}>
          <Box sx={styles.sectionContent()(theme)}>
            <Typography component="div" sx={styles.birthTitle()(theme)}>
              {displayName}
            </Typography>
            {location && (
              <Typography component="div" sx={styles.birthMeta()(theme)}>
                {location}
              </Typography>
            )}
            <Typography component="div" sx={styles.birthMeta()(theme)}>
              {dateStr}
            </Typography>
            <Typography component="div" sx={styles.birthMeta()(theme)}>
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
            onClick={() => toggleSection('astro')}
            sx={styles.sectionHeader()(theme)}
          >
            <span>Astrological Info</span>
            <span style={styles.icon(openSections.astro)}>{'>'}</span>
          </Box>
          <AccordionSection isOpen={openSections.astro}>
            <Box sx={styles.sectionContent()(theme)}>
              <Typography component="div" sx={styles.bigThreeLine()(theme)}>
                {BIG_THREE_BADGE_CONFIG.copy.sun} {sunSign}
              </Typography>
              <Typography component="div" sx={styles.bigThreeLine()(theme)}>
                {BIG_THREE_BADGE_CONFIG.copy.moon} {moonSign}
              </Typography>
              <Typography component="div" sx={styles.bigThreeLine()(theme)}>
                {BIG_THREE_BADGE_CONFIG.copy.ascendant} {ascendantSign}
              </Typography>
              <Button onClick={handleAskAI} variant="text" sx={styles.bigThreeButton()(theme)}>
                {BIG_THREE_BADGE_CONFIG.copy.button}
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
            onClick={() => toggleSection('expand')}
            sx={styles.sectionHeader()(theme)}
          >
            <span>Expand chart</span>
            <span style={styles.icon(openSections.expand)}>{'>'}</span>
          </Box>
          <AccordionSection isOpen={openSections.expand}>
            <Box sx={styles.sectionContent()(theme)}>
              <Typography component="div" sx={styles.hintLine()(theme)}>
                Click below to expand chart and enable chart interactions
              </Typography>
              <Button onClick={onExpandChart} variant="text" sx={styles.expandButton()(theme)}>
                Expand Chart
              </Button>
            </Box>
          </AccordionSection>
        </Box>
      )}
    </Box>
  );
}
