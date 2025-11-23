'use client';

import { useRouter } from 'next/navigation';
import { NOT_FOUND_CONFIG } from './not-found.config';
import { NotFoundView } from './not-found.view';

export function NotFoundContainer() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return <NotFoundView config={NOT_FOUND_CONFIG} onGoHome={handleGoHome} />;
}
