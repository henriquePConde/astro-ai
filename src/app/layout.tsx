import type { ReactNode } from 'react';
import { AuthProvider } from '@/features/auth/AuthContext';
import { HeaderAuth } from '@/components/HeaderAuth/HeaderAuth';

export const metadata = {
  title: 'Astro AI Fullstack',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <strong>Astro AI</strong>
            <HeaderAuth />
          </header>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
