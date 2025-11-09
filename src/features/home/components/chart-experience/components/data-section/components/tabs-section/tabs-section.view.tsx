'use client';

import { Tabs, Tab, Box } from '@mui/material';
import type { SyntheticEvent } from 'react';
import { styles } from './tabs-section.styles';
import type { TabsSectionViewProps } from './tabs-section.types';
import type { DataSectionTab } from '../../data-section.types';

export function TabsSectionView({ activeTab, onTabChange }: TabsSectionViewProps) {
  const handleChange = (_: SyntheticEvent, value: DataSectionTab) => {
    onTabChange(value);
  };

  return (
    <Box sx={styles.root()}>
      <Tabs value={activeTab} onChange={handleChange} variant="fullWidth" sx={styles.tabs()}>
        <Tab value="ai" label="AI Interpreter" sx={styles.tab(activeTab === 'ai')} />
        <Tab value="report" label="Report" sx={styles.tab(activeTab === 'report')} />
      </Tabs>
    </Box>
  );
}
