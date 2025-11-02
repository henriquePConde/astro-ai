'use client';

import { useAuthContext } from '@/features/auth/AuthContext';
import { HeaderAuthView } from './header-auth.view';

export function HeaderAuthContainer() {
  const { isLoading, isAuthenticated, email, signOut } = useAuthContext();

  return (
    <HeaderAuthView
      isLoading={isLoading}
      isAuthenticated={isAuthenticated}
      email={email ?? null}
      onSignOut={signOut}
    />
  );
}
