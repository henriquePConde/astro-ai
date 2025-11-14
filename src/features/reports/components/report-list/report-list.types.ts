import type { ReportSummary } from '../../services/reports.service';
import type { REPORT_LIST_CONFIG } from './report-list.config';

export type ReportListConfig = typeof REPORT_LIST_CONFIG;

export interface ReportListViewProps {
  data: ReportSummary[];
  loading?: boolean;
  error?: { message?: string } | null;
  config: ReportListConfig;
}
