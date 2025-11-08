import type { TooltipState } from './tooltip.types';

export type ChartInteractionsContextType = {
  enabled: boolean;
  toggleEnabled: () => void;
  setEnabled: (value: boolean) => void;

  onPlanetHover: (
    planet: {
      name: string;
      symbol: string;
      degree: number;
      signLabel?: string;
      house?: number;
      color?: string;
    },
    evt: MouseEvent | React.MouseEvent<any>,
  ) => void;
  onPlanetLeave: () => void;

  onHouseHover: (
    house: { number: number; degree: number },
    evt: MouseEvent | React.MouseEvent<any>,
  ) => void;
  onHouseLeave: () => void;

  onSignHover: (index: number, evt: MouseEvent | React.MouseEvent<any>) => void;
  onSignLeave: () => void;

  onAspectHover: (
    aspect: {
      type: string;
      p1?: string;
      p2?: string;
      angle?: number;
    },
    evt: MouseEvent | React.MouseEvent<any>,
  ) => void;
  onAspectLeave: () => void;
};
