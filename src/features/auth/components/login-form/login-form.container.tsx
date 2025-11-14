'use client';

import { useAuthContext } from '@/features/auth/context/AuthContext';
import { useAuthRedirect } from './hooks/use-auth-redirect.state';
import { useLoginFormActions } from './hooks/use-login-form-actions.state';
import { useSignInWithGoogleMutation } from '@/features/auth/services/auth.mutations';
import { LoginFormView } from './login-form.view';

export function LoginFormContainer() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthContext();
  const { handleSubmit, isLoading, error } = useLoginFormActions();
  const googleSignInMutation = useSignInWithGoogleMutation();

  useAuthRedirect(isAuthenticated);

  const handleGoogleSignIn = () => {
    googleSignInMutation.mutate(undefined);
  };

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
      isGoogleLoading={googleSignInMutation.isPending}
      error={
        error ||
        (googleSignInMutation.error instanceof Error ? googleSignInMutation.error.message : null)
      }
    />
  );
}
