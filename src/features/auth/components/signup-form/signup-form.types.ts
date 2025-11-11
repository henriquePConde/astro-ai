import type { Control, FieldErrors } from 'react-hook-form';
import type { SignupFormValues } from './signup-form.schema';
import type { SIGNUP_FORM_CONFIG } from './signup-form.config';
import type { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';

export interface SignupFormViewProps {
  onSubmit: (values: SignupFormValues) => void;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  control: Control<SignupFormValues>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  errors: FieldErrors<SignupFormValues>;
  config: typeof SIGNUP_FORM_CONFIG;
  routes: typeof AUTH_ROUTES;
}
