export interface ChartDimensions {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  radius: number;
}

export interface HouseCusps {
  firstHouse: number;
  secondHouse: number;
  thirdHouse: number;
  fourthHouse: number;
  fifthHouse: number;
  sixthHouse: number;
  seventhHouse: number;
  eighthHouse: number;
  ninthHouse: number;
  tenthHouse: number;
  eleventhHouse: number;
  twelfthHouse: number;
  names?: { [houseNumber: number]: string };
}

export interface Planet {
  name: string;
  symbol: string;
  position: number;
  absolutePosition: number;
  sign: number;
  symbol?: string;
  color?: string;
}

export interface ChartData { planets: Planet[]; houses: HouseCusps; aspects: any[] }

export interface PlanetInfo {
  name: string;
  position: string;
  sign: string;
  signDegree: string;
  house: number;
  houseCusp: { degree: string; sign: string; absoluteDegree: string };
  signInfo: { name: string; rulingHouses: number[]; cuspDegrees: number[]; signIndex: number };
  symbol?: string;
}

export const planetColors: Record<string, string> = {
  Sun: '#ffd6e6',
  Moon: '#e6ccff',
  Mercury: '#ccf2ff',
  Venus: '#ffe6cc',
  Mars: '#ffccf2',
  Jupiter: '#ffd6e6',
  Saturn: '#e6ccff',
  Uranus: '#ccf2ff',
  Neptune: '#ffe6cc',
  Pluto: '#ffccf2',
};


