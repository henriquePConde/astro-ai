import { Suspense } from 'react';
import { validatePdfToken } from '@/backend/features/pdf';
import { getReportWithChart } from '@/backend/features/reports';
import { notFound, redirect } from 'next/navigation';

async function PdfPreviewContent({ reportId, pdfToken }: { reportId: string; pdfToken: string }) {
  // Verify token
  const isValid = validatePdfToken(pdfToken, reportId);
  if (!isValid) {
    notFound();
  }

  // Get report data
  const report = await getReportWithChart(reportId);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{report.content.introduction}</h1>
      {/* Render report sections and chart data */}
      {/* This is a simplified version - full implementation would render all sections */}
      <div dangerouslySetInnerHTML={{ __html: report.content.introduction }} />
    </div>
  );
}

export default function PdfPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; pdfToken?: string }>;
}) {
  const params = await searchParams;
  const reportId = params.id;
  const pdfToken = params.pdfToken;

  if (!reportId || !pdfToken) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PdfPreviewContent reportId={reportId} pdfToken={pdfToken} />
    </Suspense>
  );
}
