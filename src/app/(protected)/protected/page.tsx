import { redirect } from 'next/navigation';
import { getServerSession } from '@/backend/core/auth/get-server-session';

export default async function ProtectedPage() {
  const session = await getServerSession();

  console.log('session', session);

  if (!session?.user) {
    redirect(`/login?next=${encodeURIComponent('/protected')}`);
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Protected area</h1>
      <p>Welcome, {session.user.email ?? 'friend'} 👋</p>
      <p>If you can see this, your session is valid (SSR).</p>
    </main>
  );
}
