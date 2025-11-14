import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
  useSignInMutation,
  useSignInPasswordMutation,
  useSignUpMutation,
  useSignOutMutation,
  useSignOutServerMutation,
} from '../../services/auth.mutations';
import { authKeys } from '../../services/auth.keys';
import { syncServerSession } from '../../services/auth.service';
import { AUTH_ROUTES, getAuthRedirectOrigin } from '../../constants/auth.constants';

/**
 * Orchestrates auth mutations (signIn, signOut, etc.) with proper side effects.
 * Handles session sync, cache invalidation, and navigation.
 */
export function useAuthActions() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const signInMutation = useSignInMutation();
  const signInPasswordMutation = useSignInPasswordMutation();
  const signUpMutation = useSignUpMutation();
  const signOutMutation = useSignOutMutation();
  const signOutServerMutation = useSignOutServerMutation();

  const signIn = async (email: string) => {
    await signInMutation.mutateAsync({ email, redirectTo: getAuthRedirectOrigin() });
  };

  const signOut = async () => {
    try {
      // 1) SERVER: clear cookies & revoke (idempotent, non-fatal)
      await signOutServerMutation.mutateAsync();
    } catch {
      // non-fatal - server sign-out failures are handled gracefully
      // Client sign-out will still proceed
    }

    // 2) CLIENT: clear local storage session
    await signOutMutation.mutateAsync();

    // 3) clear cache so UI flips immediately
    queryClient.setQueryData(authKeys.user(), null);
    queryClient.invalidateQueries({ queryKey: authKeys.user(), refetchType: 'active' });

    // 4) redirect to login
    router.replace(AUTH_ROUTES.LOGIN);
  };

  const signInWithPassword = async (email: string, password: string) => {
    const { user: signedInUser, session } = await signInPasswordMutation.mutateAsync({
      email,
      password,
    });

    if (signedInUser || session?.user) {
      const u = signedInUser ?? session!.user!;
      queryClient.setQueryData(authKeys.user(), {
        id: u.id,
        email: u.email ?? undefined,
      });
      queryClient.invalidateQueries({ queryKey: authKeys.user(), refetchType: 'active' });
    }

    // sync server cookies so SSR/middleware see you as logged in
    await syncServerSession(session?.access_token, session?.refresh_token);
  };

  const signUp = async (email: string, password: string) => {
    await signUpMutation.mutateAsync({ email, password });
  };

  return {
    signIn,
    signOut,
    signInWithPassword,
    signUp,
  };
}
