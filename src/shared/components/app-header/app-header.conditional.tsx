'use client';

import { usePathname } from 'next/navigation';
import { AppHeaderContainer } from './app-header.container';

export function AppHeaderConditional() {
  const pathname = usePathname();
  if (pathname?.startsWith('/pdf-preview')) return null;
  return <AppHeaderContainer />;
}

export default AppHeaderConditional;
