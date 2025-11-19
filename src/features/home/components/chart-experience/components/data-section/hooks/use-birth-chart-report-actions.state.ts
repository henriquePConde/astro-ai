'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import type { BirthChartData } from '../../../../../types/chart.types';
import type { BirthChartReportResponse } from '../../../../../services/birth-chart-report.service';
import { useGenerateBirthChartReport } from './use-generate-birth-chart-report.mutation';
import { useDownloadBirthChartPdf } from './use-download-birth-chart-pdf.mutation';
import { useReportJob } from '@/features/reports/services/reports.queries';
import { getReport } from '@/features/reports/services/reports.service';

export interface UseBirthChartReportActionsReturn {
  generateReport: () => void;
  downloadPdf: () => void;
  isGenerating: boolean;
  isDownloading: boolean;
  reportData: BirthChartReportResponse | undefined;
  generateError: unknown;
  downloadError: Error | null;
  jobProgress: number | null;
}

/**
 * Action hook that combines report generation and PDF download with validation.
 * Single responsibility: provide validated action handlers for report operations.
 * Manages mutation state internally and computes validation conditions.
 */
export function useBirthChartReportActions(
  birthData: BirthChartData | null,
  chartData: any,
): UseBirthChartReportActionsReturn {
  const [jobId, setJobId] = useState<string | null>(null);
  const [reportData, setReportData] = useState<BirthChartReportResponse | undefined>(undefined);
  const [isReportLoading, setIsReportLoading] = useState(false);

  const {
    mutate: generateReportMutation,
    isPending: isCreatePending,
    error: generateError,
  } = useGenerateBirthChartReport();

  const { data: jobData, isLoading: isJobLoading } = useReportJob(jobId);
  const job = jobData as any;

  const {
    mutate: downloadPdfMutation,
    isPending: isDownloading,
    error: downloadError,
  } = useDownloadBirthChartPdf();

  // Compute validation conditions from reportData
  const hasSections = useMemo(() => {
    if (!reportData?.content) return false;
    return Object.keys(reportData.content).length > 0;
  }, [reportData]);

  const isGenerating =
    isCreatePending || isJobLoading || isReportLoading || (!!job && job.status !== 'completed');

  // When we get a job with a completed reportId, fetch the report content once.
  useEffect(() => {
    if (!job || job.status !== 'completed' || !job.reportId) return;

    let cancelled = false;

    (async () => {
      try {
        setIsReportLoading(true);
        const detail = await getReport(job.reportId!);
        if (cancelled) return;
        // Map backend detail shape into BirthChartReportResponse shape
        setReportData({
          id: detail.id,
          userId: '', // not needed in this UI; backend DTO doesn't expose it
          personName: '',
          birthData: {},
          content: (detail.content ?? {}) as Record<string, string>,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } finally {
        if (!cancelled) {
          setIsReportLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [job]);

  const generateReport = useCallback(() => {
    if (!birthData) return;
    generateReportMutation(
      { birthData, chartData },
      {
        onSuccess: (job) => {
          setJobId(job.id);
        },
      },
    );
  }, [birthData, chartData, generateReportMutation]);

  const downloadPdf = useCallback(() => {
    if (!hasSections || !reportData) return;
    downloadPdfMutation({ reportData });
  }, [hasSections, reportData, downloadPdfMutation]);

  const jobProgress = job?.progress ?? null;

  return {
    generateReport,
    downloadPdf,
    isGenerating,
    isDownloading,
    reportData,
    generateError,
    downloadError: downloadError || null,
    jobProgress,
  };
}
