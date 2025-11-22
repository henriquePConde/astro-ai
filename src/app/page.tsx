import { Suspense } from 'react';
import { HomePageContainer } from '@/features/home';

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomePageContainer />
    </Suspense>
  );
}
