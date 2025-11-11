'use client';

import { useMemo } from 'react';
import type { BirthChartReportSections } from '../../../../../services/birth-chart-report.service';
import type { BirthChartReportResponse } from '../../../../../services/birth-chart-report.service';

export interface UseBirthChartReportSectionsReturn {
  sections: BirthChartReportSections;
  hasSections: boolean;
}

/**
 * Derived state hook that computes sections and hasSections from reportData.
 * Single responsibility: transform reportData into presentable sections state.
 */
export function useBirthChartReportSections(
  reportData: BirthChartReportResponse | undefined,
): UseBirthChartReportSectionsReturn {
  return useMemo(() => {
    const sections = reportData?.content ?? {};
    const hasSections = Object.keys(sections).length > 0;

    return {
      sections,
      hasSections,
    };
  }, [reportData]);
}
