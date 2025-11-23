import type { DataSectionTab } from './data-section.types';

/**
 * Tab identifier constants for the data section.
 */
export const DATA_SECTION_TABS = {
  AI: 'ai' as const,
  REPORT: 'report' as const,
  CHART: 'chart' as const,
} as const;

/**
 * Default active tab for the data section.
 * Used to initialize the tab state when the component mounts.
 */
export const DEFAULT_DATA_SECTION_TAB: DataSectionTab = DATA_SECTION_TABS.AI;
