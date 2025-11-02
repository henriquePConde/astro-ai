'use client';

import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/features/auth/AuthContext';
import { useSignInPassword } from '@/features/auth/hooks/use-sign-in-password.mutation';
import { useAuthRedirect } from '@/features/auth/hooks/use-auth-redirect.state';
import { useAuthFormState } from '@/features/auth/hooks/use-auth-form-state.state';
import { LoginFormView } from './login-form.view';
import type { LoginFormValues } from './login-form.schema';

export function LoginFormContainer() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const signInPasswordMutation = useSignInPassword();
  const { error, setError, clearMessages } = useAuthFormState();

  useAuthRedirect(isAuthenticated);

  const handleSubmit = async (values: LoginFormValues) => {
    clearMessages();
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
