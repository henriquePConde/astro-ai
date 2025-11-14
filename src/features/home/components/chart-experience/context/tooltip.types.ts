export type PlanetTooltip = {
  kind: 'planet';
  x: number;
  y: number;
  name: string;
  symbol: string;
  degree: number;
  signLabel?: string;
  house?: number;
  color?: string;
};

export type HouseTooltip = {
  kind: 'house';
  x: number;
  y: number;
  number: number;
  degree: number;
};

export type SignTooltip = {
  kind: 'sign';
  x: number;
  y: number;
  index: number; // 0-11
};

export type AspectTooltip = {
  kind: 'aspect';
  x: number;
  y: number;
  type: string;
  p1?: string;
  p2?: string;
  angle?: number;
};

export type TooltipState = PlanetTooltip | HouseTooltip | SignTooltip | AspectTooltip | null;

export type TooltipContextType = {
  tooltip: TooltipState;
  showTooltip: (state: TooltipState) => void;
  hideTooltip: () => void;
};
