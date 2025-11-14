import type { LoginFormValues } from './login-form.schema';

/** Props for the LoginFormView component */
export interface LoginFormViewProps {
  onSubmit: (values: LoginFormValues) => void;
  onGoogleSignIn: () => void;
  isLoading: boolean;
  isGoogleLoading: boolean;
  error: string | null;
}
