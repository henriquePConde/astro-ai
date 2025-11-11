'use client';

import { useAuthContext } from '@/features/auth/context/AuthContext';
import { useAuthRedirect } from './hooks/use-auth-redirect.state';
import { useLoginFormActions } from './hooks/use-login-form-actions.state';
import { LoginFormView } from './login-form.view';

export function LoginFormContainer() {
  const { isAuthenticated } = useAuthContext();
  const { handleSubmit, isLoading, error } = useLoginFormActions();

  useAuthRedirect(isAuthenticated);

  return <LoginFormView onSubmit={handleSubmit} isLoading={isLoading} error={error} />;
}
