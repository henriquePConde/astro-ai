'use client';

import { useAuthContext } from '@/features/auth/AuthContext';
import { useSignIn } from '@/features/auth/hooks/use-sign-in.mutation';
import { useAuthFormState } from '@/features/auth/hooks/use-auth-form-state.state';
import { OtpAuthFormView } from './otp-auth-form.view';

export function OtpAuthFormContainer() {
  const { isAuthenticated, email, signOut } = useAuthContext();
  const signInMutation = useSignIn();
  const { successMessage, setSuccessMessage, clearMessages } = useAuthFormState();

  const handleSubmit = async (emailInput: string) => {
    clearMessages();
    try {
      await signInMutation.mutateAsync({
        email: emailInput,
        redirectTo: window.location.origin,
      });
      setSuccessMessage('Check your email for a sign-in link.');
    } catch (err: any) {
      setSuccessMessage(err?.message ?? 'Failed to send magic link');
    }
  };

  return (
    <OtpAuthFormView
      onSubmit={handleSubmit}
      isLoading={signInMutation.isPending}
      isAuthenticated={isAuthenticated}
      email={email ?? null}
      onSignOut={signOut}
      message={successMessage}
    />
  );
}
