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
  color?: string;
}

export interface ChartData {
  planets: Planet[];
  houses: HouseCusps;
  aspects: any[];
}

export type ChartDataMinimal = Pick<ChartData, 'houses'>;

export interface SignInfo {
  name: string;
  rulingHouses: number[];
  cuspDegrees: number[];
  signIndex: number;
  isIntercepted: boolean;
}

export interface PlanetInfo {
  name: string;
  position: string;
  sign: string;
  signDegree: string;
  house: number;
  houseCusp: { degree: string; sign: string; absoluteDegree: string };
  signInfo: SignInfo;
  symbol?: string;
}
