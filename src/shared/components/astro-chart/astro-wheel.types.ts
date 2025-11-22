// src/shared/components/astro-chart/astro-wheel.types.ts
export interface PlanetInfo {
  name: string;
  symbol: string;
  position: string;
  sign?: string;
  house?: number;
}

export interface ChartHouses {
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
}

export interface ChartData {
  houses: ChartHouses;
  // plus whatever else you already have (planets etc.)
  [key: string]: any;
}

export interface ChartDimensions {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  radius: number;
}

export interface AstroWheelInteractionHandlers {
  onPlanetHover?: (
    payload: {
      name: string;
      symbol: string;
      degree: number;
      signLabel?: string | number;
      house?: number;
      color?: string;
    },
    evt: MouseEvent | any,
  ) => void;
  onPlanetLeave?: () => void;

  onHouseHover?: (payload: { number: number; degree: number }, evt: MouseEvent | any) => void;
  onHouseLeave?: () => void;

  onSignHover?: (index: number, evt: MouseEvent | any) => void;
  onSignLeave?: () => void;

  onAspectHover?: (
    payload: { type: string; p1?: string; p2?: string; angle?: number },
    evt: MouseEvent | any,
  ) => void;
  onAspectLeave?: () => void;
}

export interface AstroWheelProps extends Partial<AstroWheelInteractionHandlers> {
  data: ChartData | null;
  width?: number;
  height?: number;
}
