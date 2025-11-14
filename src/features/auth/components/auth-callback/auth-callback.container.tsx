'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuthCallback } from './hooks/use-auth-callback.state';
import { AuthCallbackView } from './auth-callback.view';
import { AUTH_CALLBACK_CONFIG } from './auth-callback.config';

function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get(AUTH_CALLBACK_CONFIG.queryParams.code);
  const next = searchParams.get(AUTH_CALLBACK_CONFIG.queryParams.next);

  const { error, isLoading } = useAuthCallback({ code, next });

  return <AuthCallbackView error={error} isLoading={isLoading} config={AUTH_CALLBACK_CONFIG} />;
}

export function AuthCallbackContainer() {
  return (
    <Suspense
      fallback={<AuthCallbackView error={null} isLoading={true} config={AUTH_CALLBACK_CONFIG} />}
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
