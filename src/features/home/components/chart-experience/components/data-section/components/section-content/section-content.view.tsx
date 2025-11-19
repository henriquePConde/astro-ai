'use client';

import { Box } from '@mui/material';
import { sectionContentStyles as styles } from './section-content.styles';
import type { SectionContentViewProps } from './section-content.types';
import { BirthChartReportContainer } from '../birth-chart-report/birth-chart-report.container';
import { AstroInterpreter } from '../../../astro-interpreter';

export function SectionContentView({
  activeSection,
  chartData,
  birthData,
  sections,
  hasSections,
  isGenerating,
  isDownloading,
  error,
  onGenerateReport,
  onDownloadPdf,
  config,
}: SectionContentViewProps) {
  return (
    <Box sx={styles.root()}>
      {activeSection === config.sections.interpretation ? (
        chartData && <AstroInterpreter chartData={chartData} />
      ) : (
        <BirthChartReportContainer
          birthData={birthData}
          isGenerating={isGenerating}
          isDownloading={isDownloading}
          error={error}
          sections={sections}
          hasSections={hasSections}
          onGenerate={onGenerateReport}
          onDownloadPdf={onDownloadPdf}
          jobProgress={null}
          onGoToAI={() => {}}
        />
      )}
    </Box>
  );
}
