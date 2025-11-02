'use client';

import { useState } from 'react';
import { AppHeaderContainer } from '@/shared/components/app-header/app-header.container';
import { GeocentricSystem } from '@/shared/components/solar-system/geocentric-system';
import { HomePageView } from './home-page.view';

export function HomePageContainer() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroEnd = () => {
    setIntroComplete(true);
    // For now, this callback does nothing as per requirements
  };

  return (
    <HomePageView
      headerContent={<AppHeaderContainer />}
      solarSystemContent={<GeocentricSystem onIntroEnd={handleIntroEnd} />}
    />
  );
}
