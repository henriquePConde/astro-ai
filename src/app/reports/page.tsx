import { ReportListContainer } from '@/features/reports';
import { Protected } from '@/shared/components/protected/protected.container';

export default function ReportsPage() {
  return (
    <Protected>
      <ReportListContainer />
    </Protected>
  );
}
