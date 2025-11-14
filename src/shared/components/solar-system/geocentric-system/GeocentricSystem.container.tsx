'use client';

import { useSolarSystemConfig } from './hooks/useSolarSystemConfig';
import { useFadeInOnProgress } from './hooks/useFadeInOnProgress';
import { GeocentricSystemView } from './GeocentricSystem.view';
import type { GeocentricSystemProps } from './GeocentricSystem.types';

export function GeocentricSystemContainer({ onIntroEnd }: GeocentricSystemProps) {
  const { canAnimate, loadingOpacity, progress } = useFadeInOnProgress();
  const planets = useSolarSystemConfig();

  return (
    <GeocentricSystemView
      canAnimate={canAnimate}
      loadingOpacity={loadingOpacity}
      progress={progress}
      planets={planets}
      onIntroEnd={onIntroEnd}
    />
  );
}
