import type { DataSectionTab } from '../../data-section.types';
import type { SyntheticEvent } from 'react';
import type { TABS_SECTION_CONFIG } from './tabs-section.config';

export interface TabsSectionViewProps {
  activeTab: DataSectionTab;
  onTabChange: (tab: DataSectionTab) => void;
  handleChange: (_: SyntheticEvent, value: DataSectionTab) => void;
  config: typeof TABS_SECTION_CONFIG;
}

export interface TabsSectionContainerProps {
  activeTab: DataSectionTab;
  onTabChange: (tab: DataSectionTab) => void;
}
