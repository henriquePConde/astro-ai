import type { ReactNode } from 'react';
import type { APP_SHELL_CONFIG } from './app-shell.config';

export interface AppShellViewProps {
  header: ReactNode;
  background: ReactNode;
  intro: ReactNode;
  content: ReactNode;
  config: typeof APP_SHELL_CONFIG;
}

export interface AppShellContainerProps {
  intro?: ReactNode;
  content: ReactNode;
  showIntro?: boolean;
  onIntroEnd?: () => void;
}
