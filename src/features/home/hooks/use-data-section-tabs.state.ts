'use client';

import { useState } from 'react';
import type { DataSectionTab } from '../components/chart-experience/components/data-section/data-section.types';

export function useDataSectionTabs(initial: DataSectionTab = 'ai') {
  const [activeTab, setActiveTab] = useState<DataSectionTab>(initial);
  return { activeTab, setActiveTab };
}
