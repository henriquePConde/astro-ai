'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthContext';

export default function SignupPage() {
  const { isAuthenticated, signUp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await signUp(email, password);
      // In dev with email autoconfirm ON, you should be signed in immediately
      setMessage('Account created. Redirecting…');
      router.replace('/');
    } catch (err: any) {
      setError(err?.message ?? 'Signup failed');
    }
  }

  useEffect(() => {
    if (isAuthenticated) router.replace('/');
  }, [isAuthenticated, router]);

  return (
    <main style={{ maxWidth: 480, margin: '72px auto', fontFamily: 'sans-serif' }}>
      <h1>Sign up</h1>
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
        <label>
          Confirm password
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            style={{ display: 'block', marginTop: 8, marginBottom: 16, width: '100%' }}
          />
        </label>
        <button type="submit">Create account</button>
        {error && <p style={{ color: 'crimson', marginTop: 12 }}>{error}</p>}
        {message && <p style={{ marginTop: 12 }}>{message}</p>}
      </form>
      <p style={{ marginTop: 12 }}>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </main>
  );
}
