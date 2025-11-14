import { useMemo } from 'react';
import { LOGIN_FORM_CONFIG } from '../login-form.config';

export interface UseLoginFormErrorParams {
  formError: string | null;
  googleError: Error | null;
  urlError: string | null;
  isAuthenticated: boolean;
}

/**
 * Hook that computes the display error from multiple error sources.
 * Combines form errors, Google sign-in errors, and URL errors into a single display message.
 * UI state hook - follows the *.state.ts pattern.
 */
export function useLoginFormError({
  formError,
  googleError,
  urlError,
  isAuthenticated,
}: UseLoginFormErrorParams): string | null {
  return useMemo(() => {
    // Don't show URL error if user is authenticated (transient error that was resolved)
    if (isAuthenticated) {
      return null;
    }

    // Priority: form error > Google error > URL error
    if (formError) {
      return formError;
    }

    if (googleError instanceof Error) {
      return googleError.message;
    }

    if (urlError === 'authentication_failed') {
      return LOGIN_FORM_CONFIG.messages.error.authenticationFailed;
    }

    if (urlError) {
      return `${LOGIN_FORM_CONFIG.messages.error.genericError} ${urlError}`;
    }

    return null;
  }, [formError, googleError, urlError, isAuthenticated]);
}
