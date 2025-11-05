'use client';

import { Box } from '@mui/material';

export function AppShellView({
  header,
  background,
  intro,
  content,
}: {
  header: React.ReactNode;
  background: React.ReactNode;
  intro: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <Box component="main" sx={{ position: 'relative', color: 'hsl(var(--foreground))', height: '100vh', overflow: 'hidden' }}>
      <Box sx={{ position: 'fixed', inset: 0, zIndex: -1 }}>{background}</Box>
      {header}
      {intro}
      {content}
    </Box>
  );
}


