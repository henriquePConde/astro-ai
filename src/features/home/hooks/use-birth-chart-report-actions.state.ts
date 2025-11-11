'use client';

import { useCallback, useMemo } from 'react';
import type { BirthChartData } from '../types/chart.types';
import type { BirthChartReportResponse } from '../services/birth-chart-report.service';
import { useGenerateBirthChartReport } from './use-generate-birth-chart-report.mutation';
import { useDownloadBirthChartPdf } from './use-download-birth-chart-pdf.mutation';

export interface UseBirthChartReportActionsReturn {
  generateReport: () => void;
  downloadPdf: () => void;
  isGenerating: boolean;
  isDownloading: boolean;
  reportData: BirthChartReportResponse | undefined;
  generateError: unknown;
  downloadError: Error | null;
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
  const {
    mutate: generateReportMutation,
    data: reportData,
    isPending: isGenerating,
    error: generateError,
  } = useGenerateBirthChartReport();

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

  const generateReport = useCallback(() => {
    if (!birthData) return;
    generateReportMutation({ birthData, chartData });
  }, [birthData, chartData, generateReportMutation]);

  const downloadPdf = useCallback(() => {
    if (!hasSections || !reportData) return;
    downloadPdfMutation({ reportData });
  }, [hasSections, reportData, downloadPdfMutation]);

  return {
    generateReport,
    downloadPdf,
    isGenerating,
    isDownloading,
    reportData,
    generateError,
    downloadError: downloadError || null,
  };
}
