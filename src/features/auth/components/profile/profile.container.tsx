'use client';

import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/features/auth/context/AuthContext';
import { useIsMounted } from '@/features/auth/components/header-auth/hooks/use-is-mounted.state';
import { PROFILE_CONFIG } from './profile.config';
import { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';
import { ProfileView } from './profile.view';
import { useProfileMenu } from './hooks/use-profile-menu.state';
import { getInitials } from '@/shared/utils/get-initials';
import { useUserQuery } from '@/features/auth/services/user.queries';

const CHARTS_ROUTE = '/charts';

export function ProfileContainer() {
  const { isLoading, isAuthenticated, email, signOut } = useAuthContext();
  const isMounted = useIsMounted();
  const router = useRouter();
  const menu = useProfileMenu();

  // Fetch full user data including name
  const { data: user } = useUserQuery();

  const userInitials = getInitials({
    name: user?.name ?? null,
    email: email ?? null,
  });

  const handleNavigateToCharts = () => {
    menu.handleClose();
    router.push(CHARTS_ROUTE);
  };

  const handleSignOut = async () => {
    menu.handleClose();
    await signOut();
  };

  return (
    <ProfileView
      isLoading={isLoading}
      isAuthenticated={isAuthenticated}
      userInitials={userInitials}
      email={email ?? null}
      onSignOut={handleSignOut}
      isMounted={isMounted}
      config={PROFILE_CONFIG}
      routes={{
        ...AUTH_ROUTES,
        CHARTS: CHARTS_ROUTE,
      }}
      menuAnchorEl={menu.anchorEl}
      onMenuOpen={menu.handleOpen}
      onMenuClose={menu.handleClose}
      onNavigateToCharts={handleNavigateToCharts}
    />
  );
}
