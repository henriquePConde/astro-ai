import { Suspense } from 'react';
import { LoginFormContainer } from '@/features/auth';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginFormContainer />
    </Suspense>
  );
}
