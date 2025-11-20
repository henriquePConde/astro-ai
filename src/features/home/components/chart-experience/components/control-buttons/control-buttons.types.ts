import type { CONTROL_BUTTONS_CONFIG } from './control-buttons.config';
import type { DailyUsage } from '@/features/reports/services/reports.service';

export interface ControlButtonsProps {
  onNewChart: () => void;
  config: typeof CONTROL_BUTTONS_CONFIG;
  usage?: DailyUsage;
}

export interface ControlButtonsContainerProps {
  onNewChart: () => void;
}
