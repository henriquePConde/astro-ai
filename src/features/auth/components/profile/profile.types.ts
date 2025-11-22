import type { PROFILE_CONFIG } from './profile.config';

export interface ProfileViewProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  userInitials: string;
  email?: string | null;
  onSignOut: () => Promise<void>;
  isMounted: boolean;
  config: typeof PROFILE_CONFIG;
  routes: {
    LOGIN: string;
    SIGNUP: string;
    CHARTS: string;
  };
  menuAnchorEl: HTMLElement | null;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuClose: () => void;
  onNavigateToCharts: () => void;
}
