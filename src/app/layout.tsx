import type { ReactNode } from 'react';
import { Providers } from '@/shared/config/providers';
import { AuthProvider } from '@/features/auth/AuthContext';
import { AppHeaderContainer } from '@/shared/components/app-header/app-header.container';

export const metadata = {
  title: 'Astro AI Fullstack',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthProvider>
            <AppHeaderContainer />
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
