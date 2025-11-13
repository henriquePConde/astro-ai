'use client';

import React, { createContext, useContext } from 'react';
import type { DataSectionTab } from '../data-section.types';

interface DataSectionTabsContextType {
  activeTab: DataSectionTab;
  setActiveTab: (tab: DataSectionTab) => void;
}

const DataSectionTabsContext = createContext<DataSectionTabsContextType | null>(null);

interface DataSectionTabsProviderProps {
  children: React.ReactNode;
  activeTab: DataSectionTab;
  setActiveTab: (tab: DataSectionTab) => void;
}

export function DataSectionTabsProvider({
  children,
  activeTab,
  setActiveTab,
}: DataSectionTabsProviderProps) {
  return (
    <DataSectionTabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </DataSectionTabsContext.Provider>
  );
}

export function useDataSectionTabsContext(): DataSectionTabsContextType | null {
  return useContext(DataSectionTabsContext);
}
