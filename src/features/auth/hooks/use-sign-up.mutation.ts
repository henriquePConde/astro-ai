import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../services/auth.service';
import { authKeys } from '../services/auth.keys';

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signUp(email, password),
    onSuccess: () => {
      // Invalidate user query to refetch after sign up
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
}
