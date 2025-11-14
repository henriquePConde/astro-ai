import type { LoginFormValues } from './login-form.schema';

export interface LoginFormViewProps {
  onSubmit: (values: LoginFormValues) => void;
  onGoogleSignIn: () => void;
  isLoading: boolean;
  isGoogleLoading: boolean;
  error: string | null;
}
