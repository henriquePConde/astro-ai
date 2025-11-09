// tabs-section.types.ts
import type { DataSectionTab } from '../../data-section.types';

export interface TabsSectionViewProps {
  activeTab: DataSectionTab;
  onTabChange: (tab: DataSectionTab) => void;
}
