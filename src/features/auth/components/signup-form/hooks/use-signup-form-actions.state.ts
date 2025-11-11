'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUpMutation } from '@/features/auth/services/auth.mutations';
import { useAuthFormState } from '../../login-form/hooks/use-auth-form-state.state';
import { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';
import { SIGNUP_FORM_CONFIG } from '../signup-form.config';
import type { SignupFormValues } from '../signup-form.schema';

export interface UseSignupFormActionsReturn {
  handleSubmit: (values: SignupFormValues) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

/**
 * Action hook that handles signup form submission with validation, error handling, and navigation.
 * Single responsibility: provide validated signup submission handler with proper error handling.
 */
export function useSignupFormActions(): UseSignupFormActionsReturn {
  const router = useRouter();
  const signUpMutation = useSignUpMutation();
  const { error, successMessage, setError, setSuccessMessage, clearMessages } = useAuthFormState();

  const handleSubmit = useCallback(
    async (values: SignupFormValues) => {
      clearMessages();
      try {
        await signUpMutation.mutateAsync({
          email: values.email,
          password: values.password,
        });
        setSuccessMessage(SIGNUP_FORM_CONFIG.messages.success.signupSuccess);
        router.replace(AUTH_ROUTES.HOME);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : SIGNUP_FORM_CONFIG.messages.error.signupFailed;
        setError(errorMessage);
      }
    },
    [signUpMutation, router, setError, setSuccessMessage, clearMessages],
  );

  return {
    handleSubmit,
    isLoading: signUpMutation.isPending,
    error,
    successMessage,
  };
}
