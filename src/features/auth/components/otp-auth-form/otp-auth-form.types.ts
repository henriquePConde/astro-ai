export interface OtpAuthFormViewProps {
  onSubmit: (email: string) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  email: string | null;
  onSignOut: () => void;
  message: string | null;
}
