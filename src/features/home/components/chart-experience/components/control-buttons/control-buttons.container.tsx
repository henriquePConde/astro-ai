'use client';

import { CONTROL_BUTTONS_CONFIG } from './control-buttons.config';
import { ControlButtonsContainerProps } from './control-buttons.types';
import { ControlButtonsView } from './control-buttons.view';
import { useDailyUsage } from '@/features/reports/services/reports.queries';

export function ControlButtonsContainer({ onNewChart, loading }: ControlButtonsContainerProps) {
  const { data: usage } = useDailyUsage();

  return (
    <ControlButtonsView
      onNewChart={onNewChart}
      loading={loading}
      config={CONTROL_BUTTONS_CONFIG}
      usage={usage}
    />
  );
}
