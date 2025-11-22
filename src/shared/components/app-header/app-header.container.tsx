'use client';

import { ProfileContainer } from '@/features/auth/components/profile/profile.container';
import { AppHeaderView } from './app-header.view';
import { APP_HEADER_CONFIG } from './app-header.config';

export function AppHeaderContainer() {
  return <AppHeaderView headerContent={<ProfileContainer />} config={APP_HEADER_CONFIG} />;
}
