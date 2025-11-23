import type { NOT_FOUND_CONFIG } from './not-found.config';

export interface NotFoundViewProps {
  config: typeof NOT_FOUND_CONFIG;
  onGoHome: () => void;
}
