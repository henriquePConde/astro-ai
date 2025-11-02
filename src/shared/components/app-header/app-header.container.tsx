'use client';

import { HeaderAuthContainer } from '@/features/auth';
import { AppHeaderView } from './app-header.view';

export function AppHeaderContainer() {
  return <AppHeaderView headerContent={<HeaderAuthContainer />} />;
}
