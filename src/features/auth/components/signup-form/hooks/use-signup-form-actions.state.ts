'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  useSignUpMutation,
  useCheckUserExistsMutation,
} from '@/features/auth/services/auth.mutations';
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
export function useSignupFormActions(nextPath?: string): UseSignupFormActionsReturn {
  const router = useRouter();
  const signUpMutation = useSignUpMutation();
  const checkUserExistsMutation = useCheckUserExistsMutation();
  const { error, successMessage, setError, setSuccessMessage, clearMessages } = useAuthFormState();

  const handleSubmit = useCallback(
    async (values: SignupFormValues) => {
      clearMessages();
      try {
        // Check if user exists before attempting signup
        const userExists = await checkUserExistsMutation.mutateAsync(values.email);

        if (userExists) {
          // User already exists - show error and prevent signup/redirect
          setError(SIGNUP_FORM_CONFIG.messages.error.userAlreadyExists);
          return;
        }

        // User doesn't exist - proceed with signup
        const result = await signUpMutation.mutateAsync({
          email: values.email,
          password: values.password,
        });
        // Only redirect if the mutation was successful and there's no error in the response
        if (result && !result.error) {
          setSuccessMessage(SIGNUP_FORM_CONFIG.messages.success.signupSuccess);

          const target =
            nextPath && nextPath.startsWith('/') && !nextPath.startsWith('//')
              ? nextPath
              : AUTH_ROUTES.HOME;

          router.replace(target);
        } else {
          const errorMessage = result?.error || SIGNUP_FORM_CONFIG.messages.error.signupFailed;
          setError(errorMessage);
        }
      } catch (err: unknown) {
        // Check if error indicates user already exists (fallback if pre-check missed it)
        let errorMessage: string;
        if (err instanceof Error) {
          const errMsg = err.message.toLowerCase();
          const isUserExistsError =
            errMsg.includes('user already exists') ||
            errMsg.includes('user already registered') ||
            errMsg.includes('already registered') ||
            errMsg.includes('email already exists');
          errorMessage = isUserExistsError
            ? SIGNUP_FORM_CONFIG.messages.error.userAlreadyExists
            : err.message;
        } else {
          errorMessage = SIGNUP_FORM_CONFIG.messages.error.signupFailed;
        }
        setError(errorMessage);
        // Explicitly prevent redirect on error
      }
    },
    [
      signUpMutation,
      checkUserExistsMutation,
      nextPath,
      router,
      setError,
      setSuccessMessage,
      clearMessages,
    ],
  );

  return {
    handleSubmit,
    isLoading: signUpMutation.isPending || checkUserExistsMutation.isPending,
    error,
    successMessage,
  };
}
