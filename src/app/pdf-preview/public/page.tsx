'use client';

import { usePdfPreviewPage } from './hooks/usePdfPreviewPage';
import { PDFPreview } from '@/shared/components/pdf-preview';

export default function PublicPDFPreviewPage() {
  const { reportSections, chartData, error, isLoading } = usePdfPreviewPage();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading PDF preview...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!reportSections) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Report Data Available</h2>
          <p className="text-gray-600">Please generate a report first.</p>
        </div>
      </div>
    );
  }

  return (
    <div data-pdf-page-ready="true">
      <PDFPreview isPublic={true} reportData={reportSections} chartData={chartData} />
    </div>
  );
}
