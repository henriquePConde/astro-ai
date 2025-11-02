import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useSignIn } from './use-sign-in.mutation';
import { useSignInPassword } from './use-sign-in-password.mutation';
import { useSignUp } from './use-sign-up.mutation';
import { useSignOut } from './use-sign-out.mutation';
import { authKeys } from '../services/auth.keys';
import { syncServerSession } from './use-session-sync';

/**
 * Orchestrates auth mutations (signIn, signOut, etc.) with proper side effects.
 * Handles session sync, cache invalidation, and navigation.
 */
export function useAuthActions() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const signInMutation = useSignIn();
  const signInPasswordMutation = useSignInPassword();
  const signUpMutation = useSignUp();
  const signOutMutation = useSignOut();

  const signIn = async (email: string) => {
    await signInMutation.mutateAsync({ email, redirectTo: window.location.origin });
  };

  const signOut = async () => {
    try {
      // 1) SERVER: clear cookies & revoke (idempotent)
      await fetch('/api/auth/signout', { method: 'POST', credentials: 'include' });
    } catch {
      // non-fatal
    }

    // 2) CLIENT: clear local storage session
    await signOutMutation.mutateAsync();

    // 3) clear cache so UI flips immediately
    queryClient.setQueryData(authKeys.user(), null);
    queryClient.invalidateQueries({ queryKey: authKeys.user(), refetchType: 'active' });

    // 4) redirect to login
    router.replace('/login');
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
    await syncServerSession(session ?? undefined);
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
