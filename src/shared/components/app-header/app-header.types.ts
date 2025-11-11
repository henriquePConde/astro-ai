import type { ReactNode } from 'react';
import type { APP_HEADER_CONFIG } from './app-header.config';

export interface AppHeaderViewProps {
  headerContent: ReactNode;
  config: typeof APP_HEADER_CONFIG;
}
