import { ProfilePageContainer } from '@/features/profile';
import { Protected } from '@/shared/components/protected/protected.container';

export default function ProfilePage() {
  return (
    <Protected>
      <ProfilePageContainer />
    </Protected>
  );
}


