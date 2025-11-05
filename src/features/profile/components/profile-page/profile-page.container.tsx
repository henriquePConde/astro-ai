'use client';

import { ProfilePageView } from './profile-page.view';
import { useMe } from '../../hooks/use-me.query';
import { useDailyUsage } from '@/features/reports/hooks/use-daily-usage.query';

export function ProfilePageContainer() {
  const { data: me, isLoading: loadingMe, error: errorMe } = useMe();
  const { data: usage, isLoading: loadingUsage, error: errorUsage } = useDailyUsage();
  return (
    <ProfilePageView
      me={me ?? null}
      usage={usage ?? []}
      loading={loadingMe || loadingUsage}
      error={(errorMe || errorUsage) as any}
    />
  );
}


