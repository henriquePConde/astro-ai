import { redirect } from 'next/navigation';
import { getServerSession } from '@/backend/core/auth/get-server-session';

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) {
    redirect('/auth');
  }
  return (
    <main style={{ maxWidth: 720, margin: '48px auto', fontFamily: 'sans-serif' }}>
      <h1>Dashboard</h1>
      <p>Protected content. You are signed in.</p>
    </main>
  );
}
