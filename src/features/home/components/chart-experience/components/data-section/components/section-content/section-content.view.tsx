// src/features/home/components/chart-experience/section-content.view.tsx
'use client';

import { Box } from '@mui/material';
import { sectionContentStyles as styles } from './section-content.styles';
import type { SectionContentViewProps } from './section-content.types';
import { BirthChartReportView } from '../birth-chart-report/birth-chart-report.view';
import { AstroInterpreter } from '../../../astro-interpreter';

export function SectionContentView({
  activeSection,
  chartData,
  birthData,
  reportData,
  isGenerating,
  error,
  onGenerateReport,
  onDownloadPdf,
}: SectionContentViewProps) {
  const sections = reportData ?? {};
  const hasSections = Object.keys(sections).length > 0;

  return (
    <Box sx={styles.root()}>
      {activeSection === 'interpretation' ? (
        chartData && <AstroInterpreter chartData={chartData} />
      ) : (
        <BirthChartReportView
          birthData={birthData}
          isGenerating={isGenerating}
          error={error}
          sections={sections}
          hasSections={hasSections}
          onGenerate={onGenerateReport}
          onDownloadPdf={onDownloadPdf}
        />
      )}
    </Box>
  );
}
