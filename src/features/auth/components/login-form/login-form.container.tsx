'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/features/auth/AuthContext';
import { useSignInPassword } from '@/features/auth/hooks/use-sign-in-password.mutation';
import { LoginFormView } from './login-form.view';
import type { LoginFormValues } from './login-form.schema';

export function LoginFormContainer() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const signInPasswordMutation = useSignInPassword();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (values: LoginFormValues) => {
    setError(null);
    try {
      await signInPasswordMutation.mutateAsync({ email: values.email, password: values.password });
      router.replace('/');
    } catch (err: any) {
      setError(err?.message ?? 'Login failed');
    }
  };

  return (
    <LoginFormView
      onSubmit={handleSubmit}
      isLoading={signInPasswordMutation.isPending}
      error={error}
    />
  );
}
