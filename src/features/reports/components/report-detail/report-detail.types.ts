import type { ReportDetail } from '../../services/reports.service';
import type { REPORT_DETAIL_CONFIG } from './report-detail.config';

export type ReportDetailConfig = typeof REPORT_DETAIL_CONFIG;

export interface ReportDetailViewProps {
  reportId: string;
  data: ReportDetail | null;
  loading?: boolean;
  error?: { message?: string } | null;
  config: ReportDetailConfig;
}
