import type { ReactNode } from 'react';
import { Cinzel, Cinzel_Decorative } from 'next/font/google';
import { Providers } from '@/shared/config/providers';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { AppHeaderConditional } from '@/shared/components/app-header/app-header.conditional';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel-decorative',
});

export const metadata = {
  title: 'Astro AI Fullstack',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${cinzelDecorative.variable} ${cinzel.className}`}>
        <Providers>
          <AuthProvider>
            <AppHeaderConditional />
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
