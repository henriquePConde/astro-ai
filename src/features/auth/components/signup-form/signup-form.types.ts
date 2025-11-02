import type { SignupFormValues } from './signup-form.schema';

export interface SignupFormViewProps {
  onSubmit: (values: SignupFormValues) => void;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}
