'use client';

import { useCallback } from 'react';
import { useSignInMutation } from '@/features/auth/services/auth.mutations';
import { useAuthFormState } from '../../login-form/hooks/use-auth-form-state.state';
import { getAuthRedirectOrigin } from '@/features/auth/constants/auth.constants';
import { OTP_AUTH_FORM_CONFIG } from '../otp-auth-form.config';

export interface UseOtpAuthFormActionsReturn {
  handleSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
  message: string | null;
}

/**
 * Action hook that handles OTP auth form submission with validation, error handling, and success messages.
 * Single responsibility: provide validated OTP submission handler with proper error and success handling.
 */
export function useOtpAuthFormActions(): UseOtpAuthFormActionsReturn {
  const signInMutation = useSignInMutation();
  const { successMessage, setSuccessMessage, clearMessages } = useAuthFormState();

  const handleSubmit = useCallback(
    async (email: string) => {
      clearMessages();
      try {
        await signInMutation.mutateAsync({
          email,
          redirectTo: getAuthRedirectOrigin(),
        });
        setSuccessMessage(OTP_AUTH_FORM_CONFIG.messages.success.otpSent);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : OTP_AUTH_FORM_CONFIG.messages.error.signInFailed;
        setSuccessMessage(errorMessage);
      }
    },
    [signInMutation, setSuccessMessage, clearMessages],
  );

  return {
    handleSubmit,
    isLoading: signInMutation.isPending,
    message: successMessage,
  };
}
