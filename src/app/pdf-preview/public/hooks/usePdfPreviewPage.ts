'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { birthChartReportSections } from '@/shared/constants/report-sections';
import type { ChartData } from '@/shared/components/astro-chart/types';

interface ReportData {
  content: Record<string, string>;
  chartData: any;
}

export const usePdfPreviewPage = () => {
  const params = useSearchParams();
  const reportId = params.get('id');
  const pdfToken = params.get('pdfToken');

  const [reportSections, setReportSections] = useState<Record<string, string> | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!reportId || !pdfToken) {
      setError('Invalid access. Missing parameters.');
      setReportSections(null);
      setChartData(null);
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 1. Validate token with timeout
        const validateController = new AbortController();
        const validateTimeout = setTimeout(() => validateController.abort(), 30000); // 30 second timeout

        let validateResponse: Response;
        try {
          validateResponse = await fetch(
            `/api/pdf/validate-token?reportId=${reportId}&pdfToken=${pdfToken}`,
            { signal: validateController.signal },
          );
          clearTimeout(validateTimeout);
        } catch (err) {
          clearTimeout(validateTimeout);
          if (err instanceof Error && err.name === 'AbortError') {
            throw new Error('Token validation timed out');
          }
          throw err;
        }

        if (!validateResponse.ok) {
          const errorData = await validateResponse.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to validate token');
        }

        const validateData = await validateResponse.json();
        if (!validateData.valid) {
          throw new Error('Token is invalid or expired. Please regenerate the PDF.');
        }

        // 2. Fetch report data with timeout
        const reportController = new AbortController();
        const reportTimeout = setTimeout(() => reportController.abort(), 60000); // 60 second timeout

        let reportResponse: Response;
        try {
          reportResponse = await fetch(`/api/reports/${reportId}`, {
            signal: reportController.signal,
          });
          clearTimeout(reportTimeout);
        } catch (err) {
          clearTimeout(reportTimeout);
          if (err instanceof Error && err.name === 'AbortError') {
            throw new Error('Report fetch timed out');
          }
          throw err;
        }

        if (!reportResponse.ok) {
          throw new Error('Failed to load report.');
        }

        const reportData: ReportData = await reportResponse.json();

        // 3. Organize sections in order
        const sections = reportData.content || {};
        const orderedSections: Record<string, string> = {};

        birthChartReportSections.forEach((sectionKey) => {
          if (sections[sectionKey]) {
            orderedSections[sectionKey] = sections[sectionKey];
          }
        });

        // Add any additional sections that aren't in the ordered list
        Object.keys(sections).forEach((key) => {
          if (!birthChartReportSections.includes(key)) {
            orderedSections[key] = sections[key];
          }
        });

        setReportSections(orderedSections);

        // 4. Transform chart data to match AstroWheel format
        if (reportData.chartData) {
          const transformedChartData = transformChartDataForAstroWheel(reportData.chartData);
          setChartData(transformedChartData);
        } else {
          setChartData(null);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load report data.';
        setError(errorMessage);
        setReportSections(null);
        setChartData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [reportId, pdfToken]);

  return { reportSections, chartData, error, isLoading };
};

/**
 * Transforms chart data from API format to AstroWheel ChartData format
 */
function transformChartDataForAstroWheel(apiChartData: any): ChartData {
  // The API returns data from toSimpleChartData which has:
  // - planets: { name, symbol, degree, sign, color }
  // - houses: { firstHouse, secondHouse, ... }
  // - aspects: { p1_name, p1_abs_pos, p2_name, p2_abs_pos, type, exactAngle, actualAngle }

  const planets = (apiChartData.planets || []).map((planet: any) => {
    const degree = typeof planet.degree === 'number' ? planet.degree : 0;
    return {
      name: planet.name,
      symbol: planet.symbol || '',
      position: degree,
      absolutePosition: degree,
      sign: typeof planet.sign === 'number' ? planet.sign : 0,
      color: planet.color || '#000000',
    };
  });

  const houses = {
    firstHouse:
      typeof apiChartData.houses?.firstHouse === 'number' ? apiChartData.houses.firstHouse : 0,
    secondHouse:
      typeof apiChartData.houses?.secondHouse === 'number' ? apiChartData.houses.secondHouse : 0,
    thirdHouse:
      typeof apiChartData.houses?.thirdHouse === 'number' ? apiChartData.houses.thirdHouse : 0,
    fourthHouse:
      typeof apiChartData.houses?.fourthHouse === 'number' ? apiChartData.houses.fourthHouse : 0,
    fifthHouse:
      typeof apiChartData.houses?.fifthHouse === 'number' ? apiChartData.houses.fifthHouse : 0,
    sixthHouse:
      typeof apiChartData.houses?.sixthHouse === 'number' ? apiChartData.houses.sixthHouse : 0,
    seventhHouse:
      typeof apiChartData.houses?.seventhHouse === 'number' ? apiChartData.houses.seventhHouse : 0,
    eighthHouse:
      typeof apiChartData.houses?.eighthHouse === 'number' ? apiChartData.houses.eighthHouse : 0,
    ninthHouse:
      typeof apiChartData.houses?.ninthHouse === 'number' ? apiChartData.houses.ninthHouse : 0,
    tenthHouse:
      typeof apiChartData.houses?.tenthHouse === 'number' ? apiChartData.houses.tenthHouse : 0,
    eleventhHouse:
      typeof apiChartData.houses?.eleventhHouse === 'number'
        ? apiChartData.houses.eleventhHouse
        : 0,
    twelfthHouse:
      typeof apiChartData.houses?.twelfthHouse === 'number' ? apiChartData.houses.twelfthHouse : 0,
  };

  const aspects = apiChartData.aspects || [];

  return {
    planets,
    houses,
    aspects,
  };
}
