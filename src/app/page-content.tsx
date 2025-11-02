'use client';

import { Typography, Link, Container } from '@mui/material';

export function HomePageContent() {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h1" component="h1" gutterBottom>
        Home
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Astro AI Fullstack.
      </Typography>
      <Typography variant="body1">
        Use the header to log in or sign up. Once authenticated, visit{' '}
        <Link href="/dashboard">Dashboard</Link>.
      </Typography>
    </Container>
  );
}
