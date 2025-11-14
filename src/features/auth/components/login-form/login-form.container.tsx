'use client';

import { useAuthContext } from '@/features/auth/context/AuthContext';
import { useAuthRedirect } from './hooks/use-auth-redirect.state';
import { useLoginFormActions } from './hooks/use-login-form-actions.state';
import { useUrlErrorCleanup } from './hooks/use-url-error-cleanup.state';
import { useLoginFormError } from './hooks/use-login-form-error.state';
import { useGoogleSignIn } from './hooks/use-google-sign-in.state';
import { LoginFormView } from './login-form.view';

export function LoginFormContainer() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthContext();
  const { handleSubmit, isLoading, error } = useLoginFormActions();
  const { handleGoogleSignIn, isGoogleLoading, googleError } = useGoogleSignIn();
  const urlError = useUrlErrorCleanup(isAuthenticated);

  useAuthRedirect(isAuthenticated);

  const displayError = useLoginFormError({
    formError: error,
    googleError,
    urlError,
    isAuthenticated,
  });

  // Don't render the form if we're still checking auth or if already authenticated
  // This prevents the flash of the login form
  if (isAuthLoading || isAuthenticated) {
    return null;
  }

  return (
    <LoginFormView
      onSubmit={handleSubmit}
      onGoogleSignIn={handleGoogleSignIn}
      isLoading={isLoading}
      isGoogleLoading={isGoogleLoading}
      error={displayError}
    />
  );
}
