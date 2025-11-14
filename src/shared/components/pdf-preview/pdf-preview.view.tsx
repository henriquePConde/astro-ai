'use client';

import React from 'react';
import type { PDFPreviewViewProps, EmptyStateViewProps } from './pdf-preview.types';
import { styles, GLOBAL_STYLES } from './pdf-preview.styles';

export function EmptyStateView({ config }: EmptyStateViewProps) {
  const emptyStateStyles = styles.emptyState;
  const containerProps = emptyStateStyles.container();
  const wrapperProps = emptyStateStyles.wrapper();
  const titleProps = emptyStateStyles.title();
  const messageProps = emptyStateStyles.message();

  return (
    <div className={containerProps.className}>
      <div className={wrapperProps.className}>
        <h2 className={titleProps.className}>{config.copy.emptyState.title}</h2>
        <p className={messageProps.className}>{config.copy.emptyState.message}</p>
      </div>
    </div>
  );
}

export function PDFPreviewView({
  reportData,
  chartData,
  chartImgUrl,
  currentDate,
  isReady,
  sectionEntries,
  allSectionKeys,
  totalPages,
  config,
  svgContainerRef,
  containerRef,
  AstroWheelComponent,
  MarkdownRendererComponent,
  sectionLabels,
}: PDFPreviewViewProps) {
  const getIconForSection = (index: number) => {
    return config.icons.sections[index] || config.icons.default;
  };

  // Memoize repeated style calls
  const offscreenChartStyles = styles.offscreenChart();
  const chartPageContainerStyle = styles.chartPage.container(totalPages).style;
  const chartPageContentArea = styles.chartPage.contentArea();
  const chartPageSection = styles.chartPage.section();
  const chartPageTitle = styles.chartPage.title();
  const chartPageChartContainer = styles.chartPage.chartContainer();
  const chartPageChartImage = styles.chartPage.chartImage();
  const chartPageGeneratingText = styles.chartPage.generatingText();
  const chartPageSubtitle = styles.chartPage.subtitle();
  const footerStyles = styles.footer();
  const contentPageContainer = styles.contentPage.container(allSectionKeys.length);
  const contentPageContentArea = styles.contentPage.contentArea();
  const contentPageWrapper = styles.contentPage.wrapper();
  const contentPageSection = styles.contentPage.section();
  const contentPageCard = styles.contentPage.card();
  const contentPageHeader = styles.contentPage.header();
  const contentPageIcon = styles.contentPage.icon();
  const contentPageTitle = styles.contentPage.title();

  return (
    <div ref={containerRef}>
      <style jsx global>
        {GLOBAL_STYLES}
      </style>

      {/* OFFSCREEN AstroWheel, so we can get the SVG */}
      {!chartImgUrl && chartData && (
        <div
          ref={svgContainerRef}
          className={offscreenChartStyles.className}
          style={offscreenChartStyles.style}
        >
          <AstroWheelComponent data={chartData} width={800} height={800} initialScale={1.0} />
        </div>
      )}

      {/* PAGE 1: Chart Centered */}
      <div className="pdf-preview-container" data-pdf-ready={isReady ? 'true' : 'false'}>
        <div className="a4-page" style={chartPageContainerStyle}>
          <div className={chartPageContentArea.className} style={chartPageContentArea.style}>
            <section className={chartPageSection.className} style={chartPageSection.style}>
              <h2 className={chartPageTitle.className} style={chartPageTitle.style}>
                {config.copy.chart.title}
              </h2>
              <div style={chartPageChartContainer.style}>
                {chartImgUrl ? (
                  <img
                    src={chartImgUrl}
                    alt={config.copy.chart.altText}
                    style={chartPageChartImage.style}
                  />
                ) : (
                  <span className={chartPageGeneratingText.className}>
                    {config.copy.chart.generatingText}
                  </span>
                )}
              </div>
              <div className={chartPageSubtitle.className} style={chartPageSubtitle.style}>
                {config.copy.chart.subtitle}
              </div>
            </section>
          </div>
          <div className={footerStyles.className} style={footerStyles.style}>
            {config.copy.footer.prefix} {currentDate || config.copy.footer.fallbackDate}{' '}
            {config.copy.footer.suffix}
          </div>
        </div>
      </div>

      {/* PAGE 2: Introduction */}
      {reportData.introduction && (
        <div className="pdf-preview-container">
          <div className={contentPageContainer.className} style={contentPageContainer.style}>
            <div className={contentPageContentArea.className}>
              <div className={contentPageWrapper.className} style={contentPageWrapper.style}>
                <section className={contentPageSection.className} style={contentPageSection.style}>
                  <div className={contentPageCard.className} style={contentPageCard.style}>
                    <div className={contentPageHeader.className}>
                      <div className={contentPageIcon.className}>{config.icons.introduction}</div>
                      <h2 className={contentPageTitle.className} style={contentPageTitle.style}>
                        {sectionLabels.introduction || config.copy.introduction.defaultLabel}
                      </h2>
                    </div>
                    <MarkdownRendererComponent
                      content={reportData.introduction || ''}
                      colorMode="dark"
                    />
                  </div>
                </section>
              </div>
            </div>
            <div className={footerStyles.className} style={footerStyles.style}>
              {config.copy.footer.prefix} {currentDate || config.copy.footer.fallbackDate}{' '}
              {config.copy.footer.suffix}
            </div>
          </div>
        </div>
      )}

      {/* Other Sections */}
      {sectionEntries.map(([key, content], index) => {
        const isLast = index === sectionEntries.length - 1;
        const sectionPageContainer = styles.sectionPage.container(isLast);
        return (
          <div key={key} className={sectionPageContainer.className}>
            <div className="a4-page">
              <div className={contentPageContentArea.className}>
                <div className={contentPageWrapper.className} style={contentPageWrapper.style}>
                  <section
                    className={contentPageSection.className}
                    style={contentPageSection.style}
                  >
                    <div className={contentPageCard.className} style={contentPageCard.style}>
                      <div className={contentPageHeader.className}>
                        <div className={contentPageIcon.className}>
                          {getIconForSection(index + 1)}
                        </div>
                        <h2 className={contentPageTitle.className} style={contentPageTitle.style}>
                          {sectionLabels[key] || key}
                        </h2>
                      </div>
                      <MarkdownRendererComponent content={content} colorMode="dark" />
                    </div>
                  </section>
                </div>
              </div>
              <div className={footerStyles.className} style={footerStyles.style}>
                {config.copy.footer.prefix} {currentDate || config.copy.footer.fallbackDate}{' '}
                {config.copy.footer.suffix}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
