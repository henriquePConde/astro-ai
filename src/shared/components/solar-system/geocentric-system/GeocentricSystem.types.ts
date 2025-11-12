import type { PlanetConfig } from './hooks/useSolarSystemConfig';

export interface GeocentricSystemProps {
  onIntroEnd: () => void;
}

export interface GeocentricSystemViewProps {
  canAnimate: boolean;
  loadingOpacity: number;
  progress: number;
  planets: PlanetConfig[];
  onIntroEnd: () => void;
}
