'use client';

import { useAuthContext } from '@/features/auth/context/AuthContext';
import { useIsMounted } from '@/features/auth/components/header-auth/hooks/use-is-mounted.state';
import { HEADER_AUTH_CONFIG } from './header-auth.config';
import { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';
import { HeaderAuthView } from './header-auth.view';

export function HeaderAuthContainer() {
  const { isLoading, isAuthenticated, email, signOut } = useAuthContext();
  const isMounted = useIsMounted();

  return (
    <HeaderAuthView
      isLoading={isLoading}
      isAuthenticated={isAuthenticated}
      email={email ?? null}
      onSignOut={signOut}
      isMounted={isMounted}
      config={HEADER_AUTH_CONFIG}
      routes={AUTH_ROUTES}
    />
  );
}
