'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSignInPasswordMutation } from '@/features/auth/services/auth.mutations';
import { useAuthFormState } from './use-auth-form-state.state';
import { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';
import { LOGIN_FORM_CONFIG } from '../login-form.config';
import type { LoginFormValues } from '../login-form.schema';

export interface UseLoginFormActionsReturn {
  handleSubmit: (values: LoginFormValues) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Action hook that handles login form submission with validation, error handling, and navigation.
 * Single responsibility: provide validated login submission handler with proper error handling.
 */
export function useLoginFormActions(): UseLoginFormActionsReturn {
  const router = useRouter();
  const signInPasswordMutation = useSignInPasswordMutation();
  const { error, setError, clearMessages } = useAuthFormState();

  const handleSubmit = useCallback(
    async (values: LoginFormValues) => {
      clearMessages();
      try {
        await signInPasswordMutation.mutateAsync({
          email: values.email,
          password: values.password,
        });
        router.replace(AUTH_ROUTES.HOME);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : LOGIN_FORM_CONFIG.messages.error.loginFailed;
        setError(errorMessage);
      }
    },
    [signInPasswordMutation, router, setError, clearMessages],
  );

  return {
    handleSubmit,
    isLoading: signInPasswordMutation.isPending,
    error,
  };
}
