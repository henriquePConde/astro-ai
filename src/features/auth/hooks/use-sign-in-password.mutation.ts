// src/features/auth/hooks/use-sign-in-password.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signInWithPassword } from '../services/auth.service';
import { authKeys } from '../services/auth.keys';

export function useSignInPassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signInWithPassword(email, password), // returns { user, session }
    onSuccess: (data) => {
      if (data?.user) {
        queryClient.setQueryData(authKeys.user(), {
          id: data.user.id,
          email: data.user.email ?? undefined,
        });
      }
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
}
