'use client';

import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ChartData } from '../astro-chart/types';
import { MarkdownRenderer } from '../markdown-renderer';
import { sectionLabels } from '@/shared/constants/report-sections';

const AstroWheel = dynamic(() => import('../astro-chart/AstroWheel'), { ssr: false });

interface PDFPreviewProps {
  reportData?: Record<string, string>;
  chartData?: ChartData | null;
  isPublic?: boolean;
}

// Helper for section icon
function iconForSection(index: number) {
  return ['☆', '☽', '☾', '☿', '♀', '♂', '♃', '♇'][index] || '✧';
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({ reportData = {}, chartData }) => {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [chartImgUrl, setChartImgUrl] = useState<string | null>(null);
  const [tried, setTried] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  // Mark page as ready when content is loaded
  useEffect(() => {
    // If we have report data, we can mark as ready
    // Chart image conversion can happen in the background
    if (reportData && Object.keys(reportData).length > 0) {
      // If we have chart data, wait for image or proceed after a delay
      if (chartData) {
        if (chartImgUrl) {
          // Chart image is ready
          setIsReady(true);
        } else {
          // Wait a bit for chart image conversion, but don't block too long
          const timer = setTimeout(() => {
            setIsReady(true);
          }, 5000); // Give it 5 seconds to convert
          return () => clearTimeout(timer);
        }
      } else {
        // No chart data, mark as ready immediately
        setIsReady(true);
      }
    }
  }, [reportData, chartData, chartImgUrl]);

  // Update data attribute when ready state changes
  useEffect(() => {
    const container = document.querySelector('.pdf-preview-container');
    if (container) {
      if (isReady) {
        container.setAttribute('data-pdf-ready', 'true');
      } else {
        container.setAttribute('data-pdf-ready', 'false');
      }
    }
  }, [isReady]);

  // SVG to PNG with background color
  useEffect(() => {
    if (chartImgUrl) return;
    if (!svgContainerRef.current) return;
    const svg = svgContainerRef.current.querySelector('svg');
    if (!svg) {
      if (tried < 10) setTimeout(() => setTried((t) => t + 1), 200);
      return;
    }
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new window.Image();

    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw dark semi-transparent background first
        ctx.fillStyle = 'rgb(13,12,34)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const imgURL = canvas.toDataURL('image/png');
        setChartImgUrl(imgURL);
        URL.revokeObjectURL(url);
      }
    };
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [chartData, tried, chartImgUrl]);

  if (!reportData || Object.keys(reportData).length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Report Data Available</h2>
          <p className="text-gray-600">Please generate a report first.</p>
        </div>
      </div>
    );
  }

  const sectionEntries = Object.entries(reportData).filter(([key]) => key !== 'introduction');
  const allSectionKeys = ['introduction', ...sectionEntries.map(([key]) => key)];
  const totalPages = allSectionKeys.length + 1;

  return (
    <div ref={containerRef}>
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 5mm;
          }
          .pdf-preview-container html,
          .pdf-preview-container body {
            width: 794px;
            margin: 0;
            padding: 0;
            background: white !important;
          }
          .pdf-preview-container * {
            background-color: white !important;
          }
          .pdf-preview-container .a4-page {
            width: 794px;
            height: 1140px;
            background: white !important;
            box-sizing: border-box;
            padding: 0px 56px 56px 56px;
            display: flex;
            flex-direction: column;
            position: relative;
            page-break-after: always;
          }
          .pdf-preview-container .pdf-content-area {
            width: 682px;
            background: white !important;
            flex: 1 1 auto;
          }
          .pdf-preview-container .pdf-footer {
            margin-top: 48px;
            text-align: center;
            background: white !important;
            color: #444;
            font-family: 'Playfair Display', serif;
          }
          .nextjs-static-indicator-toast-wrapper {
            display: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
          .pdf-content-section {
            page-break-before: always;
          }
          .pdf-content-section:first-child {
            page-break-before: auto;
          }
          .pdf-content-section.last-section {
            page-break-after: avoid !important;
          }
        }
        /* Same rules for @media screen */
        .pdf-preview-container .a4-page {
          width: 794px;
          min-height: 1140px;
          background: white !important;
          box-sizing: border-box;
          padding: 0px 56px 56px 56px;
          display: flex;
          flex-direction: column;
          position: relative;
          margin: 0 auto;
        }
        .pdf-preview-container .pdf-content-area {
          width: 682px;
          background: white !important;
          flex: 1 1 auto;
        }
        .pdf-preview-container .pdf-footer {
          margin-top: 48px;
          text-align: center;
          background: white !important;
          color: #444;
          font-family: 'Playfair Display', serif;
        }
      `}</style>

      {/* OFFSCREEN AstroWheel, so we can get the SVG */}
      {!chartImgUrl && chartData && (
        <div
          className="flex items-center justify-center min-w-[450px] min-h-full w-full h-full p-4"
          ref={svgContainerRef}
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            width: '800px',
            height: '800px',
            pointerEvents: 'none',
            opacity: 0,
          }}
        >
          <AstroWheel data={chartData} width={800} height={800} />
        </div>
      )}

      {/* PAGE 1: Chart Centered */}
      <div className="pdf-preview-container" data-pdf-ready={isReady ? 'true' : 'false'}>
        <div
          className="a4-page"
          style={{
            pageBreakAfter: totalPages === 1 ? 'auto' : 'always',
          }}
        >
          <div
            className="pdf-content-area flex flex-col justify-center items-center"
            style={{ height: '100%' }}
          >
            <section
              className="chart-section avoid-break mb-6 w-full flex flex-col justify-center items-center"
              style={{ flex: 1 }}
            >
              <h2
                className="text-2xl font-bold text-center mb-8"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Your Birth Chart
              </h2>
              <div
                style={{
                  width: '700px',
                  height: '700px',
                  borderRadius: '100%',
                  border: '5px solid transparent',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {chartImgUrl ? (
                  <img
                    src={chartImgUrl}
                    alt="Astro Chart"
                    style={{
                      width: '660px',
                      height: '660px',
                      borderRadius: '100%',
                      display: 'block',
                      background: '#fff',
                    }}
                  />
                ) : (
                  <span className="text-gray-400">Generating chart image…</span>
                )}
              </div>
              <div
                className="text-center text-gray-600 italic mt-10"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '15px',
                }}
              >
                Your unique celestial blueprint at the moment of birth
              </div>
            </section>
          </div>
          <div
            className="pdf-footer text-center text-xs text-gray-500"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Generated on {currentDate || 'Today'} • Birth Chart Report
          </div>
        </div>
      </div>

      {/* PAGE 2: Introduction */}
      {reportData.introduction && (
        <div className="pdf-preview-container">
          <div
            className="a4-page pdf-content-section"
            style={{
              pageBreakAfter: allSectionKeys.length === 1 ? 'auto' : 'always',
            }}
          >
            <div className="pdf-content-area">
              <div className="content-wrapper">
                <section className="mb-6" style={{ width: '100%' }}>
                  <div
                    className="relative p-8 rounded-2xl border border-purple-200/30 bg-white"
                    style={{ width: '100%' }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="text-3xl text-purple-400/60 mr-4">☆</div>
                      <h2
                        className="text-2xl font-bold text-purple-800"
                        style={{
                          fontFamily: 'Playfair Display, serif',
                        }}
                      >
                        {sectionLabels.introduction || 'Introduction'}
                      </h2>
                    </div>
                    <MarkdownRenderer content={reportData.introduction || ''} colorMode="dark" />
                  </div>
                </section>
              </div>
            </div>
            <div
              className="pdf-footer text-center text-xs text-gray-500"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Generated on {currentDate || 'Today'} • Birth Chart Report
            </div>
          </div>
        </div>
      )}

      {/* Other Sections */}
      {sectionEntries.map(([key, content], index) => (
        <div
          key={key}
          className={`pdf-preview-container pdf-content-section ${
            index === sectionEntries.length - 1 ? 'last-section' : ''
          }`}
        >
          <div className="a4-page">
            <div className="pdf-content-area">
              <div className="content-wrapper" style={{ width: '100%' }}>
                <section className="mb-6" style={{ width: '100%' }}>
                  <div
                    className="relative p-8 rounded-2xl border border-purple-200/30 bg-white"
                    style={{ width: '100%' }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="text-3xl text-purple-400/60 mr-4">
                        {iconForSection(index + 1)}
                      </div>
                      <h2
                        className="text-2xl font-bold text-purple-800"
                        style={{
                          fontFamily: 'Playfair Display, serif',
                        }}
                      >
                        {sectionLabels[key] || key}
                      </h2>
                    </div>
                    <MarkdownRenderer content={content} colorMode="dark" />
                  </div>
                </section>
              </div>
            </div>
            <div
              className="pdf-footer text-center text-xs text-gray-500"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Generated on {currentDate || 'Today'} • Birth Chart Report
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
