import { redirect } from 'next/navigation';
import { getSessionUser } from '@/backend/core/auth/get-session';

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect('/login');
  return (
    <main style={{ maxWidth: 720, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}</p>
    </main>
  );
}
