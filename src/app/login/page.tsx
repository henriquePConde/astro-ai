import { Suspense } from 'react';
import { LoginFormContainer } from '@/features/auth';

function LoginFormContent() {
  return <LoginFormContainer />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginFormContent />
    </Suspense>
  );
}
