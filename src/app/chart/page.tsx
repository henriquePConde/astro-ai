import { ChartPageContainer } from '@/features/chart';
import { Protected } from '@/shared/components/protected/protected.container';

export default function ChartPage() {
  return (
    <Protected>
      <ChartPageContainer />
    </Protected>
  );
}
