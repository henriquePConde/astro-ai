'use client';

import { HeaderAuthContainer } from '@/features/auth';
import { AppHeaderView } from './app-header.view';
import { APP_HEADER_CONFIG } from './app-header.config';

export function AppHeaderContainer() {
  return <AppHeaderView headerContent={<HeaderAuthContainer />} config={APP_HEADER_CONFIG} />;
}
