import type { HEADER_AUTH_CONFIG } from './header-auth.config';
import type { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';

export interface HeaderAuthViewProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  email: string | null;
  onSignOut: () => void;
  isMounted: boolean;
  config: typeof HEADER_AUTH_CONFIG;
  routes: typeof AUTH_ROUTES;
}
