'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { PDFPreviewView, EmptyStateView } from './pdf-preview.view';
import { PDF_PREVIEW_CONFIG } from './pdf-preview.config';
import type { PDFPreviewContainerProps } from './pdf-preview.types';
import { sectionLabels } from '@/shared/constants/report-sections';
import { useCurrentDate } from './hooks/use-current-date.state';
import { useSvgToPng } from './hooks/use-svg-to-png';
import { usePdfReady } from './hooks/use-pdf-ready.state';
import { usePdfDomAttributes } from './hooks/use-pdf-dom-attributes';
import { usePdfSections } from './hooks/use-pdf-sections.state';

const AstroWheel = dynamic(() => import('../astro-chart/AstroWheel'), { ssr: false });
const MarkdownRenderer = dynamic(
  () => import('../markdown-renderer').then((mod) => mod.MarkdownRenderer),
  { ssr: false },
);

export function PDFPreviewContainer({ reportData = {}, chartData }: PDFPreviewContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentDate = useCurrentDate();
  const { chartImgUrl, svgContainerRef, isGenerating, error } = useSvgToPng(chartData);
  const isReady = usePdfReady(reportData, chartData, chartImgUrl, isGenerating);
  usePdfDomAttributes(isReady);
  const { sectionEntries, allSectionKeys, totalPages } = usePdfSections(reportData);

  if (!reportData || Object.keys(reportData).length === 0) {
    return <EmptyStateView config={PDF_PREVIEW_CONFIG} />;
  }

  return (
    <PDFPreviewView
      reportData={reportData}
      chartData={chartData || null}
      chartImgUrl={chartImgUrl}
      currentDate={currentDate}
      isReady={isReady}
      sectionEntries={sectionEntries}
      allSectionKeys={allSectionKeys}
      totalPages={totalPages}
      config={PDF_PREVIEW_CONFIG}
      svgContainerRef={svgContainerRef}
      containerRef={containerRef}
      AstroWheelComponent={AstroWheel as React.ComponentType<any>}
      MarkdownRendererComponent={MarkdownRenderer as React.ComponentType<any>}
      sectionLabels={sectionLabels}
    />
  );
}
