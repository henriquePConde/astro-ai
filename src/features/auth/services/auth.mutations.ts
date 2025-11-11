import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signInWithOtp, signInWithPassword, signUp, signOut, signOutServer } from './auth.service';
import { authKeys } from './auth.keys';

/**
 * Mutation hook for OTP sign-in (magic link).
 * Defined in services layer for reusability and separation of concerns.
 */
export function useSignInMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, redirectTo }: { email: string; redirectTo?: string }) =>
      signInWithOtp(email, { redirectTo }),
    onSuccess: () => {
      // Invalidate user query to refetch after sign in
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
}

/**
 * Mutation hook for password-based sign-in.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useSignInPasswordMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signInWithPassword(email, password), // returns { user, session }
    onSuccess: (data) => {
      if (data?.user) {
        queryClient.setQueryData(authKeys.user(), {
          id: data.user.id,
          email: data.user.email ?? undefined,
        });
      }
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
}

/**
 * Mutation hook for user sign-up.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useSignUpMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signUp(email, password),
    onSuccess: () => {
      // Invalidate user query to refetch after sign up
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
}

/**
 * Mutation hook for client-side sign-out (clears local storage).
 * Defined in services layer for reusability and separation of concerns.
 */
export function useSignOutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      // ensure UI flips immediately
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.invalidateQueries({ queryKey: authKeys.user(), refetchType: 'active' });
    },
  });
}

/**
 * Mutation hook for server-side sign-out (clears cookies & revokes session).
 * Idempotent: non-fatal if server sign-out fails.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useSignOutServerMutation() {
  return useMutation({
    mutationFn: () => signOutServer(),
    // Non-fatal: server sign-out failures are handled gracefully
    onError: () => {
      // Silently handle errors - sign-out should be idempotent
    },
  });
}
