import React from 'react';

export const GLOBAL_STYLES = `
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
`;

export const styles = {
  emptyState: {
    container: () => ({
      className: 'min-h-screen bg-gray-100 py-8 flex items-center justify-center',
    }),
    wrapper: () => ({
      className: 'text-center',
    }),
    title: () => ({
      className: 'text-2xl font-semibold text-gray-800 mb-2',
    }),
    message: () => ({
      className: 'text-gray-600',
    }),
  },
  offscreenChart: () => ({
    className: 'flex items-center justify-center min-w-[450px] min-h-full w-full h-full p-4',
    style: {
      position: 'absolute',
      left: '-9999px',
      top: '-9999px',
      width: '800px',
      height: '800px',
      pointerEvents: 'none',
      opacity: 0,
    } satisfies React.CSSProperties,
  }),
  chartPage: {
    container: (totalPages: number) => ({
      style: {
        pageBreakAfter: totalPages === 1 ? 'auto' : 'always',
      } satisfies React.CSSProperties,
    }),
    contentArea: () => ({
      className: 'pdf-content-area flex flex-col justify-center items-center',
      style: { height: '100%' },
    }),
    section: () => ({
      className: 'chart-section avoid-break mb-6 w-full flex flex-col justify-center items-center',
      style: { flex: 1 },
    }),
    title: () => ({
      className: 'text-2xl font-bold text-center mb-8',
      style: {
        fontFamily: "'Playfair Display', serif",
        background: 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      },
    }),
    chartContainer: () => ({
      style: {
        width: '700px',
        height: '700px',
        borderRadius: '100%',
        border: '5px solid transparent',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
    chartImage: () => ({
      style: {
        width: '660px',
        height: '660px',
        borderRadius: '100%',
        display: 'block',
        background: '#fff',
      },
    }),
    generatingText: () => ({
      className: 'text-gray-400',
    }),
    subtitle: () => ({
      className: 'text-center text-gray-600 italic mt-10',
      style: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '15px',
      },
    }),
  },
  footer: () => ({
    className: 'pdf-footer text-center text-xs text-gray-500',
    style: { fontFamily: "'Playfair Display', serif" },
  }),
  contentPage: {
    container: (allSectionKeysLength: number) => ({
      className: 'a4-page pdf-content-section',
      style: {
        pageBreakAfter: allSectionKeysLength === 1 ? 'auto' : 'always',
      } satisfies React.CSSProperties,
    }),
    contentArea: () => ({
      className: 'pdf-content-area',
    }),
    wrapper: () => ({
      className: 'content-wrapper',
      style: { width: '100%' },
    }),
    section: () => ({
      className: 'mb-6',
      style: { width: '100%' },
    }),
    card: () => ({
      className: 'relative p-8 rounded-2xl border border-purple-200/30 bg-white',
      style: { width: '100%' },
    }),
    header: () => ({
      className: 'flex items-center mb-6',
    }),
    icon: () => ({
      className: 'text-3xl text-purple-400/60 mr-4',
    }),
    title: () => ({
      className: 'text-2xl font-bold text-purple-800',
      style: {
        fontFamily: "'Playfair Display', serif",
      },
    }),
  },
  sectionPage: {
    container: (isLast: boolean) => ({
      className: `pdf-preview-container pdf-content-section ${isLast ? 'last-section' : ''}`,
    }),
  },
};
