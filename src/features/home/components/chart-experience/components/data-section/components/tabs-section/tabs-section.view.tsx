'use client';

import { Tabs, Tab, Box, useMediaQuery, useTheme } from '@mui/material';
import { styles } from './tabs-section.styles';
import type { TabsSectionViewProps } from './tabs-section.types';

export function TabsSectionView({
  activeTab,
  onTabChange,
  handleChange,
  config,
}: TabsSectionViewProps) {
  const theme = useTheme();
  const isDesktopLayout = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box sx={styles.root()(theme)}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant={config.ui.tabs.variant}
        sx={styles.tabs()(theme)}
      >
        {/* On mobile/tablet: Natal Chart first, then AI, Report */}
        {!isDesktopLayout && (
          <Tab
            value={config.values.chart}
            label={config.copy.tabs.chart}
            sx={styles.tab(activeTab === config.values.chart)(theme)}
          />
        )}
        <Tab
          value={config.values.ai}
          label={config.copy.tabs.ai}
          sx={styles.tab(activeTab === config.values.ai)(theme)}
        />
        <Tab
          value={config.values.report}
          label={config.copy.tabs.report}
          sx={styles.tab(activeTab === config.values.report)(theme)}
        />
        {/* On desktop, we don't show the chart tab at all */}
        {isDesktopLayout && null}
      </Tabs>
    </Box>
  );
}
