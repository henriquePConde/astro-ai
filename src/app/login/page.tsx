'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthContext';

export default function LoginPage() {
  const { isAuthenticated, signInWithPassword } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await signInWithPassword(email, password);
      router.replace('/');
    } catch (err: any) {
      setError(err?.message ?? 'Login failed');
    }
  }

  useEffect(() => {
    if (isAuthenticated) router.replace('/');
  }, [isAuthenticated, router]);

  return (
    <main style={{ maxWidth: 480, margin: '72px auto', fontFamily: 'sans-serif' }}>
      <h1>Log in</h1>
      <form onSubmit={onSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: 'block', marginTop: 8, marginBottom: 16, width: '100%' }}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: 'block', marginTop: 8, marginBottom: 16, width: '100%' }}
          />
        </label>
        <button type="submit">Log in</button>
        {error && <p style={{ color: 'crimson', marginTop: 12 }}>{error}</p>}
      </form>
      <p style={{ marginTop: 12 }}>
        Don&apos;t have an account? <a href="/signup">Sign up</a>
      </p>
    </main>
  );
}
