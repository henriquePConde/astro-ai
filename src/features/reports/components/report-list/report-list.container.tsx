'use client';

import { REPORT_LIST_CONFIG } from './report-list.config';
import { ReportListView } from './report-list.view';
import { useReports } from './hooks/use-reports.query';

export function ReportListContainer() {
  const { data, isLoading, error } = useReports();
  return (
    <ReportListView
      data={data ?? []}
      loading={isLoading}
      error={error as any}
      config={REPORT_LIST_CONFIG}
    />
  );
}
