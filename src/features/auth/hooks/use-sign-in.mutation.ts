import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signInWithOtp } from '../services/auth.service';
import { authKeys } from '../services/auth.keys';

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, redirectTo }: { email: string; redirectTo?: string }) =>
      signInWithOtp(email, { redirectTo }),
    onSuccess: () => {
      // Invalidate user query to refetch after sign in
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
}
