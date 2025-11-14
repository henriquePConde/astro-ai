'use client';

import { CONTROL_BUTTONS_CONFIG } from './control-buttons.config';
import { ControlButtonsContainerProps } from './control-buttons.types';
import { ControlButtonsView } from './control-buttons.view';

export function ControlButtonsContainer({ onNewChart }: ControlButtonsContainerProps) {
  return <ControlButtonsView onNewChart={onNewChart} config={CONTROL_BUTTONS_CONFIG} />;
}
