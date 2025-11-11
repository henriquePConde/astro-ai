import type { ReactNode } from 'react';

export default function PublicPDFLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ margin: 0, padding: 0, background: 'white', minHeight: '100vh' }}>{children}</div>
  );
}
