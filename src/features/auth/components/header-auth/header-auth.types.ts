export interface HeaderAuthViewProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  email: string | null;
  onSignOut: () => void;
}
