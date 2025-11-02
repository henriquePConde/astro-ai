// src/features/auth/hooks/use-sign-out.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signOut } from '../services/auth.service';
import { authKeys } from '../services/auth.keys';

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      // ensure UI flips immediately
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.invalidateQueries({ queryKey: authKeys.user(), refetchType: 'active' });
    },
  });
}
