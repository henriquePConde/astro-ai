'use client';

import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/features/auth/AuthContext';
import { useSignUp } from '@/features/auth/hooks/use-sign-up.mutation';
import { useAuthRedirect } from '@/features/auth/hooks/use-auth-redirect.state';
import { useAuthFormState } from '@/features/auth/hooks/use-auth-form-state.state';
import { SignupFormView } from './signup-form.view';
import type { SignupFormValues } from './signup-form.schema';

export function SignupFormContainer() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const signUpMutation = useSignUp();
  const { error, successMessage, setError, setSuccessMessage, clearMessages } = useAuthFormState();

  useAuthRedirect(isAuthenticated);

  const handleSubmit = async (values: SignupFormValues) => {
    clearMessages();
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
