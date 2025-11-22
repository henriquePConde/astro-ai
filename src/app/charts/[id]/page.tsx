import { ChartViewContainer } from '@/features/charts';

// In Next.js 15, route params are provided as an async value.
// We mark this page as async and await the params before using them.
export default async function ChartDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ChartViewContainer chartId={id} />;
}
