'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabaseBrowser } from '@/backend/core/auth/supabase-browser';

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const client = supabaseBrowser();
    client.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      setIsLoading(false);
    });

    const { data: sub } = client.auth.onAuthStateChange(async () => {
      const { data } = await client.auth.getUser();
      setEmail(data.user?.email ?? null);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoading,
      isAuthenticated: !!email,
      email,
      async signIn(e: string) {
        const client = supabaseBrowser();
        await client.auth.signInWithOtp({
          email: e,
          options: { emailRedirectTo: window.location.origin },
        });
      },
      async signOut() {
        const client = supabaseBrowser();
        await client.auth.signOut();
        setEmail(null);
      },
      async signInWithPassword(e: string, p: string) {
        const client = supabaseBrowser();
        const { error } = await client.auth.signInWithPassword({ email: e, password: p });
        if (error) throw error;
        const { data } = await client.auth.getUser();
        setEmail(data.user?.email ?? null);
      },
      async signUp(e: string, p: string) {
        const client = supabaseBrowser();
        const { error } = await client.auth.signUp({ email: e, password: p });
        if (error) throw error;
        const { data } = await client.auth.getUser();
        setEmail(data.user?.email ?? null);
      },
    }),
    [isLoading, email],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
