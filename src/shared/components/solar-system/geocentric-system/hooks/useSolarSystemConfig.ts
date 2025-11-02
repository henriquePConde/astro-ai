export interface PlanetConfig {
  name: string;
  distance: number;
  speed: number;
  size?: number;
  textureFile: string;
}

export function useSolarSystemConfig(): PlanetConfig[] {
  return [
    { name: 'Moon', distance: 0.7, speed: 0.6, size: 0.09, textureFile: 'moon.jpg' },
    { name: 'Sun', distance: 1.2, speed: 0.5, size: 0.22, textureFile: 'sun.jpg' },
    { name: 'Mercury', distance: 1.5, speed: 0.45, size: 0.1, textureFile: 'mercury.jpg' },
    { name: 'Venus', distance: 1.8, speed: 0.35, size: 0.13, textureFile: 'venus.jpg' },
    { name: 'Mars', distance: 2.1, speed: 0.3, size: 0.12, textureFile: 'mars.jpg' },
    { name: 'Jupiter', distance: 2.5, speed: 0.2, size: 0.23, textureFile: 'jupiter.jpg' },
    { name: 'Saturn', distance: 2.9, speed: 0.15, size: 0.21, textureFile: 'saturn.jpg' },
    { name: 'Uranus', distance: 3.3, speed: 0.12, size: 0.16, textureFile: 'uranus.jpg' },
    { name: 'Neptune', distance: 3.7, speed: 0.09, size: 0.16, textureFile: 'neptune.jpg' },
    { name: 'Pluto', distance: 4.1, speed: 0.06, size: 0.09, textureFile: 'pluto.jpg' },
  ];
}
