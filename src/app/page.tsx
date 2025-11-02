export default function HomePage() {
  return (
    <main style={{ maxWidth: 720, margin: '48px auto', fontFamily: 'sans-serif' }}>
      <h1>Home</h1>
      <p>Welcome to Astro AI Fullstack.</p>
      <p>
        Use the header to log in or sign up. Once authenticated, visit{' '}
        <a href="/dashboard">Dashboard</a>.
      </p>
    </main>
  );
}
