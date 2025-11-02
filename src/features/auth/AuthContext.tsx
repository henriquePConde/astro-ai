// src/features/auth/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import type { Session } from '@supabase/supabase-js';
import { supabaseBrowser } from '@/shared/services/supabase-browser';
import { useAuth as useAuthQuery } from './hooks/use-auth.query';
import { useSignIn } from './hooks/use-sign-in.mutation';
import { useSignInPassword } from './hooks/use-sign-in-password.mutation';
import { useSignUp } from './hooks/use-sign-up.mutation';
import { useSignOut } from './hooks/use-sign-out.mutation';
import { authKeys } from './services/auth.keys';

type AuthContextValue = {
  isLoading: boolean;
  isAuthenticated: boolean;
  email?: string | null;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Tell the server to adopt the current session (writes cookies in /api/auth/sync)
async function syncServerSession(session?: Session | null) {
  const access_token = session?.access_token;
  const refresh_token = session?.refresh_token;
  if (!access_token || !refresh_token) return;

  try {
    await fetch('/api/auth/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ access_token, refresh_token }),
    });
  } catch {
    // non-fatal
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: user, isLoading, fetchStatus } = useAuthQuery();

  const signInMutation = useSignIn();
  const signInPasswordMutation = useSignInPassword();
  const signUpMutation = useSignUp();
  const signOutMutation = useSignOut();

  useEffect(() => {
    const supabase = supabaseBrowser();

    // @ts-expect-error debug only
    if (typeof window !== 'undefined') window.sb = supabase;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user
        ? { id: session.user.id, email: session.user.email ?? undefined }
        : null;

      // keep cache synced so UI flips instantly
      queryClient.setQueryData(authKeys.user(), u);
      queryClient.invalidateQueries({ queryKey: authKeys.user(), refetchType: 'active' });

      // sync cookies on SIGNED_IN / TOKEN_REFRESHED
      await syncServerSession(session ?? undefined);
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  const isActuallyLoading = isLoading && fetchStatus === 'fetching' && user === undefined;

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoading: isActuallyLoading,
      isAuthenticated: !!user,
      email: user?.email ?? null,

      async signIn(email: string) {
        await signInMutation.mutateAsync({ email, redirectTo: window.location.origin });
      },

      async signOut() {
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
      },

      async signInWithPassword(email: string, password: string) {
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
      },

      async signUp(email: string, password: string) {
        await signUpMutation.mutateAsync({ email, password });
      },
    }),
    [
      isActuallyLoading,
      user,
      signInMutation,
      signInPasswordMutation,
      signUpMutation,
      signOutMutation,
      queryClient,
      router,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
