'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthContext } from '@/features/auth/context/AuthContext';
import { useOtpAuthFormActions } from './hooks/use-otp-auth-form-actions.state';
import { OtpAuthFormSchema, type OtpAuthFormValues } from './otp-auth-form.schema';
import { OTP_AUTH_FORM_CONFIG } from './otp-auth-form.config';
import { HEADER_AUTH_CONFIG } from '../header-auth/header-auth.config';
import { OtpAuthFormView } from './otp-auth-form.view';

export function OtpAuthFormContainer() {
  const { isAuthenticated, email, signOut } = useAuthContext();
  const { handleSubmit: handleFormSubmit, isLoading, message } = useOtpAuthFormActions();

  const {
    control,
    handleSubmit: formHandleSubmit,
    formState: { errors },
  } = useForm<OtpAuthFormValues>({
    resolver: zodResolver(OtpAuthFormSchema),
    defaultValues: {
      [OTP_AUTH_FORM_CONFIG.fields.email.name]: '',
    },
  });

  const onSubmit = (values: OtpAuthFormValues) => {
    handleFormSubmit(values.email);
  };

  return (
    <OtpAuthFormView
      onSubmit={handleFormSubmit}
      isLoading={isLoading}
      isAuthenticated={isAuthenticated}
      email={email ?? null}
      onSignOut={signOut}
      message={message}
      control={control}
      handleSubmit={formHandleSubmit(onSubmit)}
      errors={errors}
      config={OTP_AUTH_FORM_CONFIG}
      headerConfig={HEADER_AUTH_CONFIG}
    />
  );
}
