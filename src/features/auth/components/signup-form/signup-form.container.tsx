'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthContext } from '@/features/auth/context/AuthContext';
import { useAuthRedirect } from '../login-form/hooks/use-auth-redirect.state';
import { useSignupFormActions } from './hooks/use-signup-form-actions.state';
import { SignupFormSchema, type SignupFormValues } from './signup-form.schema';
import { SIGNUP_FORM_CONFIG } from './signup-form.config';
import { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';
import { SignupFormView } from './signup-form.view';

export function SignupFormContainer() {
  const { isAuthenticated } = useAuthContext();
  const {
    handleSubmit: handleFormSubmit,
    isLoading,
    error,
    successMessage,
  } = useSignupFormActions();

  const {
    control,
    handleSubmit: formHandleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useAuthRedirect(isAuthenticated);

  return (
    <SignupFormView
      onSubmit={handleFormSubmit}
      isLoading={isLoading}
      error={error}
      successMessage={successMessage}
      control={control}
      handleSubmit={formHandleSubmit(handleFormSubmit)}
      errors={errors}
      config={SIGNUP_FORM_CONFIG}
      routes={AUTH_ROUTES}
    />
  );
}
