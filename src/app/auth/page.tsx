'use client';

import { FormEvent, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';

export default function AuthPage() {
  const { isLoading, isAuthenticated, email, signIn, signOut } = useAuth();
  const [input, setInput] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    await signIn(input);
    setMessage('Check your email for a sign-in link.');
  }

  return (
    <main style={{ maxWidth: 480, margin: '72px auto', fontFamily: 'sans-serif' }}>
      <h1>Sign in</h1>
      {isLoading ? (
        <p>Loading…</p>
      ) : isAuthenticated ? (
        <div>
          <p>Signed in as {email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="email"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
              style={{ display: 'block', marginTop: 8, marginBottom: 16, width: '100%' }}
            />
          </label>
          <button type="submit">Send magic link</button>
          {message && <p style={{ marginTop: 12 }}>{message}</p>}
        </form>
      )}
    </main>
  );
}
