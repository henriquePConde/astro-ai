'use client';

import { usePathname } from 'next/navigation';
import { AppHeaderContainer } from './app-header.container';

export function AppHeaderConditional() {
  const pathname = usePathname();
  // Hide header on auth pages and PDF preview pages
  if (pathname?.startsWith('/pdf-preview') || pathname === '/login' || pathname === '/signup') {
    return null;
  }
  return <AppHeaderContainer />;
}

export default AppHeaderConditional;
