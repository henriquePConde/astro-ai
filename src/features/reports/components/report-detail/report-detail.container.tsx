'use client';

import { REPORT_DETAIL_CONFIG } from './report-detail.config';
import { ReportDetailView } from './report-detail.view';
import { useReport } from './hooks/use-report.query';

export function ReportDetailContainer({ reportId }: { reportId: string }) {
  const { data, isLoading, error } = useReport(reportId);
  return (
    <ReportDetailView
      reportId={reportId}
      data={data ?? null}
      loading={isLoading}
      error={error as any}
      config={REPORT_DETAIL_CONFIG}
    />
  );
}
