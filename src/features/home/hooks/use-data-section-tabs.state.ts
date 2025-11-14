'use client';

import { useState } from 'react';
import type { DataSectionTab } from '../components/chart-experience/components/data-section/data-section.types';
import { DEFAULT_DATA_SECTION_TAB } from '../components/chart-experience/components/data-section/data-section.constants';

export function useDataSectionTabs(initial: DataSectionTab = DEFAULT_DATA_SECTION_TAB) {
  const [activeTab, setActiveTab] = useState<DataSectionTab>(initial);
  return { activeTab, setActiveTab };
}
