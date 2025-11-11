'use client';

import { TABS_SECTION_CONFIG } from './tabs-section.config';
import { useTabsSectionHandler } from './hooks/use-tabs-section-handler.state';
import { TabsSectionView } from './tabs-section.view';
import type { TabsSectionContainerProps } from './tabs-section.types';

export function TabsSectionContainer({ activeTab, onTabChange }: TabsSectionContainerProps) {
  const { handleChange } = useTabsSectionHandler({ onTabChange });

  return (
    <TabsSectionView
      activeTab={activeTab}
      onTabChange={onTabChange}
      handleChange={handleChange}
      config={TABS_SECTION_CONFIG}
    />
  );
}
