'use client';

import { AppShellView } from './app-shell.view';
import { APP_SHELL_CONFIG } from './app-shell.config';
import type { AppShellContainerProps } from './app-shell.types';
import { GeocentricSystem } from '@/shared/components/solar-system/geocentric-system';
import { AppHeaderContainer } from '@/shared/components/app-header/app-header.container';

export function AppShellContainer({
  intro,
  content,
  showIntro,
  onIntroEnd,
}: AppShellContainerProps) {
  return (
    <AppShellView
      header={<AppHeaderContainer />}
      background={<GeocentricSystem onIntroEnd={onIntroEnd ?? (() => {})} />}
      intro={showIntro ? intro : null}
      content={content}
      config={APP_SHELL_CONFIG}
    />
  );
}
