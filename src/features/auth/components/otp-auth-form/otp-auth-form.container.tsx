'use client';

import { useState } from 'react';
import { useAuthContext } from '@/features/auth/AuthContext';
import { useSignIn } from '@/features/auth/hooks/use-sign-in.mutation';
import { OtpAuthFormView } from './otp-auth-form.view';

export function OtpAuthFormContainer() {
  const { isAuthenticated, email, signOut } = useAuthContext();
  const signInMutation = useSignIn();
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (emailInput: string) => {
    setMessage(null);
    try {
      await signInMutation.mutateAsync({
        email: emailInput,
        redirectTo: window.location.origin,
      });
      setMessage('Check your email for a sign-in link.');
    } catch (err: any) {
      setMessage(err?.message ?? 'Failed to send magic link');
    }
  };

  return (
    <OtpAuthFormView
      onSubmit={handleSubmit}
      isLoading={signInMutation.isPending}
      isAuthenticated={isAuthenticated}
      email={email ?? null}
      onSignOut={signOut}
      message={message}
    />
  );
}
