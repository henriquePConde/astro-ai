'use client';

import { Tabs, Tab, Box, useTheme } from '@mui/material';
import { styles } from './tabs-section.styles';
import type { TabsSectionViewProps } from './tabs-section.types';

export function TabsSectionView({
  activeTab,
  onTabChange,
  handleChange,
  config,
}: TabsSectionViewProps) {
  const theme = useTheme();

  return (
    <Box sx={styles.root()(theme)}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant={config.ui.tabs.variant}
        sx={styles.tabs()(theme)}
      >
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
      </Tabs>
    </Box>
  );
}
