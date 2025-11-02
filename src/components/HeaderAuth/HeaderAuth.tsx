'use client';

import { useAuth } from '@/features/auth/AuthContext';
import Link from 'next/link';

export function HeaderAuth() {
  const { isLoading, isAuthenticated, email, signOut } = useAuth();
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {isLoading ? (
        <span>…</span>
      ) : isAuthenticated ? (
        <>
          <span style={{ opacity: 0.8 }}>{email}</span>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/login">Log in</Link>
          <Link href="/signup">Sign up</Link>
        </div>
      )}
    </div>
  );
}
