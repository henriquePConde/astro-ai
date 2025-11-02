import type { LoginFormValues } from './login-form.schema';

export interface LoginFormViewProps {
  onSubmit: (values: LoginFormValues) => void;
  isLoading: boolean;
  error: string | null;
}
