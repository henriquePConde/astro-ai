'use client';

import { useState } from 'react';
import type { DataSectionTab } from '../data-section.types';
import { DEFAULT_DATA_SECTION_TAB } from '../data-section.constants';

export function useDataSectionTabs(initial: DataSectionTab = DEFAULT_DATA_SECTION_TAB) {
  const [activeTab, setActiveTab] = useState<DataSectionTab>(initial);
  return { activeTab, setActiveTab };
}
