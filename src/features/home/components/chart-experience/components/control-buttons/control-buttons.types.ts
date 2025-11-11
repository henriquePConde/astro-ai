import type { CONTROL_BUTTONS_CONFIG } from './control-buttons.config';

export interface ControlButtonsProps {
  onNewChart: () => void;
  config: typeof CONTROL_BUTTONS_CONFIG;
}

export interface ControlButtonsContainerProps {
  onNewChart: () => void;
}
