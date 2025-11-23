import { DATA_SECTION_TABS } from '../../data-section.constants';

export const TABS_SECTION_CONFIG = {
  copy: {
    tabs: {
      ai: 'AI Interpreter',
      report: 'Report',
      chart: 'Natal Chart',
    },
  },
  ui: {
    tabs: {
      variant: 'fullWidth' as const,
    },
  },
  values: {
    ai: DATA_SECTION_TABS.AI,
    report: DATA_SECTION_TABS.REPORT,
    chart: DATA_SECTION_TABS.CHART,
  },
} as const;
