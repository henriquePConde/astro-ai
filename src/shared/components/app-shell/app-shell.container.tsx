'use client';

import { AppShellView } from './app-shell.view';
import { GeocentricSystem } from '@/shared/components/solar-system/geocentric-system';
import { AppHeaderContainer } from '@/shared/components/app-header/app-header.container';

export function AppShellContainer({
  intro,
  content,
  showIntro,
  onIntroEnd,
}: {
  intro?: React.ReactNode;
  content: React.ReactNode;
  showIntro?: boolean;
  onIntroEnd?: () => void;
}) {
  return (
    <AppShellView
      header={<AppHeaderContainer />}
      background={<GeocentricSystem onIntroEnd={onIntroEnd ?? (() => {})} />}
      intro={showIntro ? intro : null}
      content={content}
    />
  );
}


