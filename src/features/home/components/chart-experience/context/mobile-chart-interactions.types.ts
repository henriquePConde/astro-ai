import type { ChartElementData } from '../components/chart-element-modal/chart-element-modal.types';

export interface MobileChartInteractionsContextType {
  showElementModal: (elementData: ChartElementData) => void;
  hideElementModal: () => void;
  isModalOpen: boolean;
  currentElement: ChartElementData | null;

  // Hover handlers (no-ops for mobile, but needed for AstroWheel compatibility)
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

  // Click handlers that show modal instead of direct navigation
  onPlanetClick: (
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

  onHouseClick: (
    house: { number: number; degree: number },
    evt: MouseEvent | React.MouseEvent<any>,
  ) => void;

  onSignClick: (index: number, evt: MouseEvent | React.MouseEvent<any>) => void;

  onAspectClick: (
    aspect: {
      type: string;
      p1?: string;
      p2?: string;
      angle?: number;
    },
    evt: MouseEvent | React.MouseEvent<any>,
  ) => void;
}

export interface MobileChartInteractionsProviderProps {
  children: React.ReactNode;
  chartData: any; // Will use the same chart data type as main interactions
  onNavigateToAI: (message: string) => void;
}
