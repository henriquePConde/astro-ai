import type { CHART_ELEMENT_MODAL_CONFIG } from './chart-element-modal.config';

export type ChartElementType = 'planet' | 'house' | 'sign' | 'aspect';

export interface ChartElementData {
  type: ChartElementType;
  // Planet data
  planetName?: string;
  planetSymbol?: string;
  planetSign?: string;
  planetHouse?: number;
  planetDegree?: number;
  planetColor?: string;
  // House data
  houseNumber?: number;
  houseDegree?: number;
  // Sign data
  signIndex?: number;
  signName?: string;
  signHouseSummary?: string;
  signRulerSummary?: string;
  // Aspect data
  aspectType?: string;
  aspectPlanet1?: string;
  aspectPlanet2?: string;
  aspectAngle?: number;
}

export interface ChartElementModalViewProps {
  isOpen: boolean;
  elementData: ChartElementData | null;
  onClose: () => void;
  onAskAI: () => void;
  config: typeof CHART_ELEMENT_MODAL_CONFIG;
}

export interface ChartElementModalContainerProps {
  isOpen: boolean;
  elementData: ChartElementData | null;
  onClose: () => void;
  onNavigateToAI: (message: string) => void;
}
