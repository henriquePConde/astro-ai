import type { Control, FieldErrors } from 'react-hook-form';
import type { OtpAuthFormValues } from './otp-auth-form.schema';
import type { OTP_AUTH_FORM_CONFIG } from './otp-auth-form.config';
import type { HEADER_AUTH_CONFIG } from '../header-auth/header-auth.config';

export interface OtpAuthFormViewProps {
  onSubmit: (email: string) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  email: string | null;
  onSignOut: () => void;
  message: string | null;
  control: Control<OtpAuthFormValues>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  errors: FieldErrors<OtpAuthFormValues>;
  config: typeof OTP_AUTH_FORM_CONFIG;
  headerConfig: typeof HEADER_AUTH_CONFIG;
}
