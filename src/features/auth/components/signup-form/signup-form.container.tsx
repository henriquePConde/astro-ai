'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/features/auth/AuthContext';
import { useSignUp } from '@/features/auth/hooks/use-sign-up.mutation';
import { SignupFormView } from './signup-form.view';
import type { SignupFormValues } from './signup-form.schema';

export function SignupFormContainer() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const signUpMutation = useSignUp();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (values: SignupFormValues) => {
    setError(null);
    setSuccessMessage(null);
    try {
      await signUpMutation.mutateAsync({ email: values.email, password: values.password });
      setSuccessMessage('Account created. Redirecting…');
      router.replace('/');
    } catch (err: any) {
      setError(err?.message ?? 'Signup failed');
    }
  };

  return (
    <SignupFormView
      onSubmit={handleSubmit}
      isLoading={signUpMutation.isPending}
      error={error}
      successMessage={successMessage}
    />
  );
}
