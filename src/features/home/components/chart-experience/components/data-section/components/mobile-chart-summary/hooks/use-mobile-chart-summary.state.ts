import { useState, useMemo } from 'react';
import { getRandomPlanetColor } from '@/shared/config/planet-colors';

/**
 * UI state hook for mobile chart summary view.
 * Component-level hook for local UI state only (no I/O).
 */
export function useMobileChartSummaryState() {
  const [openSections, setOpenSections] = useState<{
    birth: boolean;
    astro: boolean;
    controls: boolean;
    expand: boolean;
  }>({
    birth: false,
    astro: false,
    controls: true,
    expand: true,
  });

  const toggleSection = (key: 'birth' | 'astro' | 'controls' | 'expand') => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Generate random planet colors for each bullet point
  const birthMetaColors = useMemo(
    () => [getRandomPlanetColor(), getRandomPlanetColor(), getRandomPlanetColor()],
    [],
  );
  const bigThreeColors = useMemo(
    () => [getRandomPlanetColor(), getRandomPlanetColor(), getRandomPlanetColor()],
    [],
  );
  const hintLineColor = useMemo(() => getRandomPlanetColor(), []);

  return {
    openSections,
    toggleSection,
    birthMetaColors,
    bigThreeColors,
    hintLineColor,
  };
}
